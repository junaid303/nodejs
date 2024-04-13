const http = require("http");
const fs = require("fs");
const port = 8080;

const server = http.createServer((req,res)=>{
    const logMessage = `Hello, The Server Got hit by ${req.socket.remoteAddress}\n`;
    console.log(logMessage);
    fs.appendFile("logs.txt", logMessage, (err) => {
        if (err) {
            console.error("Error writing to log file:", err);
        }
    });
    res.end("Hello World From the Server : 8080");
});

server.listen(port, ()=>{
    console.log(`Server Started at port : ${port}`);
});
