const http = require("http");
const port = 8080;

const server = http.createServer((req,res)=>{
    console.log(`Hello, The Server Got hit by ${req.socket.remoteAddress}`);
    res.end("Hello World From the Server : 8080");
});

server.listen(port, ()=>{
    console.log(`Server Started at port : ${port}`);
});

