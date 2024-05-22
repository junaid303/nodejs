import http from "http";

const port = 8080;
const server = http.createServer((req,res)=>{
    res.end("Server Stated ");
});

server.listen(port, ()=>{
    console.log(`Server Started at port ${port}`);
})