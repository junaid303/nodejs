import http from "http";
import fs from "fs/promises";
import url from "url";
import { generate_id, validateTaskdata , insertDb, updateDb} from "./utils/index.js";


const port = 8080;
const server = http.createServer(async (req, res) => {
  try {
    const parsedURL = url.parse(req.url, true);

    // Route Handling
    /*
    API Endpoint : /api/tasks
    HTTP Method : GET
    Data Validations  : None //Data Validation must be done in three frontened level, sever lever, data 
    Desc : Read all the task from data.json and send the data as response 
    */
    if (req.method === "GET" && parsedURL.pathname === "/api/tasks") {
      // Read data.json and send JSON data as response
      let data = await fs.readFile("data.json");
      res.writeHead(200, { 'Content-Type': "application/json" });
      res.end(data); // Send the data read from data.json
    }
    else if(req.method === "GET" && parsedURL.pathname === "/api/task") {
  let _id = parsedURL.query._id;
  let data = JSON.parse(await fs.readFile("data.json"));
  let index = data.findIndex(ele => ele._id === _id);
  if (index === -1) {
    res.writeHead(400, {'Content-type': "application/json"});
    return res.end(JSON.stringify({message: "Invalid ID."}));
  }
  let task = data.find(ele => ele._id === _id);
  res.writeHead(200, {'Content-type': "application/json"});
  res.end(JSON.stringify(task));
}



    
    /*
    API Endpoint : /api/tasks//add
    HTTP Method : POST 
    Data Validations  :   { taskname, deadline , status}
    Desc : Read req.body and insert into data.json file 
    */ 
    else if (req.method === "POST" && parsedURL.pathname === "/api/tasks/add") {
      let body = '';
      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => { // Ensure this is marked async
        body = JSON.parse(body);
        body._id = generate_id(10); 
        body.status = false; //we assume status to be false
        // console.log(body);
         
        //Data Validation Middleware  
        let validationResult = validateTaskdata(body);
        //If the validateResult is an empty object, then add body to data.json
        //If validationResult is not empty object , then send 400 error as response
        if(validationResult.message){
          res.writeHead(400,{'Content-type':"application/json"});
          res.end(JSON.stringify(validationResult));
          
        }else {
          //Read the file, prase the file data
          //append the body obj into parsed object
          //fs write the updated data
          
            insertDb(body);
            res.writeHead(200, {'Content-type': "application/json"});
            res.end(JSON.stringify({ message: "Task has been inserted into DB" }));
          }
        });

    }/*
    API Endpoint : /api/tasks/edit
    HTTP Method : PUT
    Data Validations  :   { taskname, deadline , status}
    Params : _id
    Desc : Read req.body and update it into data.json file 
    */
    
    else if (req.method === "PUT" && parsedURL.pathname === "/api/tasks/edit") {
      let body = '';
      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => { // Ensure this is marked async
        body = JSON.parse(body);
        let _id = parsedURL.query._id;
        // console.log(body);
        // console.log(_id);
        //Data Validation Middleware  
        let validationResult = validateTaskdata(body);
        //If the validateResult is an empty object, then add body to data.json
        //If validationResult is not empty object , then send 400 error as response
        if(validationResult.message){
          res.writeHead(400,{'Content-type':"application/json"});
          res.end(JSON.stringify(validationResult));
          
        }else {
          //Read the file, prase the file data
          //append the body obj into parsed object
          //fs write the updated data
          updateDb(body,_id)
            res.writeHead(200, {'Content-type': "application/json"});
            res.end(JSON.stringify({ message: "Task has been updated into DB" }));
          }
        })
     
    }
    /*
    API Endpoint : /api/tasks/delete
    HTTP Method : DELETE
    Data Validations  :   { taskname, deadline , status}
    Desc : Read req.body and delete the record in data.json file 
    */
    
    else if (req.method === "DELETE" && parsedURL.pathname==="api/tasks/delete") {
      let _id = parsedURL.query._id;
      let data = JSON.parse(await fs.readFile("data.json"));
      let index = data.findIndex(ele => ele._id === _id);
      if(index === -1){
        res.writeHead(400, {'Content-type':"application/json"});
        return res.end(JSON.stringify({message : "Invalid ID"}));
      }
      data = data.filter(ele=> ele._id !==_id);
      await fs.writeFile("data.json", JSON.stringify(data));
      res.writeHead(200, {'Content-type':"application/json"});
      res.end(JSON.stringify({message: "Task has been deleted from the DB "}));
    } 
    
     else if (req.method === "GET" && parsedURL.pathname === "/") {
      res.writeHead(200, { 'Content-Type': "application/json" });
      const message = { message: "Hello World. Welcome to My App" };
      res.end(JSON.stringify(message));
    } else {
      // Unrecognized/Unsupported HTTP Method response
      res.writeHead(404, { 'Content-Type': "application/json" });
      const message = { status: "Not Found: Invalid path" };
      res.end(JSON.stringify(message));
    }
 } catch (error) {
    res.writeHead(500, { 'Content-Type': "application/json" });
    res.end(JSON.stringify({ error: 'Something went wrong with the server, Internal Error' }));
  }
});

server.listen(port, () => {
  console.log(`Server Started at port ${port}`);
});
