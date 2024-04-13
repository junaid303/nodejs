const http = require("http");
const fs = require("fs");
const port = 8080;

const server = http.createServer((req, res) => {
    // Capture request details
    const remoteAddress = req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const referer = req.headers['referer'] || 'Not specified';
    const dateTime = new Date().toISOString();
    const method = req.method;
    const url = req.url;

    // Log request details
    const logMessage = `HTTP Req Log\nRemote Address: ${remoteAddress}\nUser-Agent: ${userAgent}\nDate-Time: ${dateTime}\nHTTP Method: ${method}\nURL: ${url}\n`;
    console.log(logMessage);
    fs.appendFile("logs.txt", logMessage, (err) => {
        if (err) {
            console.error("Error writing to log file:", err);
        }
    });

    // Respond to the request
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("Hello World From the Server : 8080");
});

server.listen(port, () => {
    console.log(`Server Started at port : ${port}`);
});
