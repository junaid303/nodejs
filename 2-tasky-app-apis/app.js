import http from "http";

const port = 8080;
const server = http.createServer((req,res)=>{
    console.log(req.method);
    //Route Handling
    if(req.method === "GET"){
        //read data.json and send json data as response
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
});

server.listen(port, ()=>{
    console.log(`Server Started at port ${port}`);
})