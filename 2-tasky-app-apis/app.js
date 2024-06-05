import http from "http";
import fs from "fs/promises";
import url from "url";

const port = 8080;
const server = http.createServer(async (req,res)=>{
    try {
        console.log(req.url);
        console.log(url.parse(req.url));
        
    //Route Handling
    if(req.method === "GET"){
        //read data.json and send json data as response
        let data = await fs.readFile("data.json");
        // res.statusCode = 200;
        // res.setHeader('Content-Type', 'application/json');
        res.writeHead(200, {'Content-Type':"application/json"}); //with res.writeHead, you can apply both res.statusCode and res.setHeader in one line
        res.end(data);  // send the data read from data.json
        //status code, application content type json
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

    
    } catch (error) {
        res.writeHead(500, {'Content-Type': "application/json"});
        res.end(JSON.stringify({error: 'Something went wrong with the server, Internal Error'}));//stringfy is required coz we put json in content type
        // console.log(error);//console.log error is required when you want to debug something 
    }
});

server.listen(port, ()=>{
    console.log(`Server Started at port ${port}`);
})