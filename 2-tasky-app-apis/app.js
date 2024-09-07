import http from "http";
import fs from "fs/promises";
import url from "url";
import {generate_id} from "./utils/index.js";

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
    }/*
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
        //Create/Generate _id according to data validation rules 
        
      });
      res.end("You are hitting POST method !")

    } else if (req.method === "PUT") {
      res.end("You are hitting PUT method !");
    } else if (req.method === "DELETE") {
      res.end("You are hitting DELETE method !");
    } else if (req.method === "GET" && parsedURL.pathname === "/") {
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
