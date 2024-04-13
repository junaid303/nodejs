
const http = require("http");
const fs = require("fs/promises");

const port = 8080;

const server = http.createServer((req, res) => {
    logRequestDetails(req, res);
    res.end("Hello World from Server 1 : 8080");
});

server.listen(port, () => {
    console.log(`Server Started at ${port}`);
});


