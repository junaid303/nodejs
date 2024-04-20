
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


function logRequestDetails(req, res) {
    const remoteAddress = req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const dateTime = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const statusCode = res.statusCode;
    const referer = req.headers.referer || '-'; // "-" if referer header is not present

    const logMessage = `Remote Address: ${remoteAddress} - User-Agent: ${userAgent} - Date-time: ${dateTime} - Method: ${method} -URL: ${url} -Status Code: ${statusCode} -Referer: ${referer}\n`;

    console.log(logMessage); // Log to console

    // Append log message to logs.txt file
    fs.appendFile("logs.txt", logMessage)
        .then(() => console.log("Log message appended to logs.txt"))
        .catch((err) => console.error("Error appending log message to logs.txt:", err));
}







/*
Middleware : 
 Middleware functions have access to the HTTP request and response for each application route (or endpoint). 
They can execute any code, make changes to the request and the response objects, end the request-response cycle, 
 or call the next middleware function in the stack.
*/