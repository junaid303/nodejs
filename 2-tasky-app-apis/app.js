import http from "http";
import fs from "fs/promises"

const port = 8080;
const server = http.createServer(async (req,res)=>{
    try {
        console.log(req.method);
    //Route Handling
    if(req.method === "GET"){
        //read data.json and send json data as response
        const data = await fs.readFile("data.json");
        // res.statusCode = 200;
        // res.setHeader('Content-Type', 'application/json');
        res.writeHead(200, {'Content-Type':"application/json"}); //with res.writeHead, you can apply both res.statusCode and res.setHeader in one line
        res.end(data);  // send the data read from data.json
        //status code, application content type json
        res.end("You are hitting GET method !");
    }else if (req.method === "POST"){
        //refer req.on (data & end) event in M6 session
        //accept req.body from client and insert into data.json
        //_id : create a function that generates 10 character alpha numberic
        res.end("You are hitting POST method !");
    }else if(req.method === "PUT"){
        //How do you extract :_id from the URL
        res.end("You are hitting PUT method !");
    }else if(req.method === "DELETE"){
        res.end("You are hitting DELETE method !");
    }else {
        //Unrecognised/Unsupported HTTP Method response 
        //send 405 response code
        res.end("Hello ")
    }
    res.end("Server Stated ");
    } catch (error) {
        console.log(error);
    }
});

server.listen(port, ()=>{
    console.log(`Server Started at port ${port}`);
})