import http from "http";
import fs from "fs/promises";
import url from "url";

const port = 8080;

function logRequestDetails(req, res) {
    const remoteAddress = req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const dateTime = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const statusCode = res.statusCode;
    const referer = req.headers.referer || '-'; // "-" if referer header is not present
    const contentLength = res.getHeader('content-length') || '-';

    const logMessage = `Remote Address: ${remoteAddress} - User-Agent: ${userAgent} - Date-time: ${dateTime} - Method: ${method} -URL: ${url} -Status Code: ${statusCode} -Referer: ${referer} - Content-length: ${contentLength}\n`;

    console.log(logMessage); // Log to console

    // Append log message to logs.txt file
    fs.appendFile("logs.txt", logMessage)
        .then(() => console.log("Log message appended to logs.txt"))
        .catch((err) => console.error("Error appending log message to logs.txt:", err));
}

const server = http.createServer(async (req,res)=>{
    try {
        //HTTP Middleware 
        logRequestDetails(req,res)
         //It Extracts pathname, searchparams from req.url object
         const parsedURL = url.parse(req.url, true);
          /*
            API Endpoint : /api/tasks
            HTTP Method : GET
            Data Validations  : None 
            Desc : Read all the tasks from data.json and send the data as response
        */
           if(req.method==="GET" && parsedURL.pathname==="/api/tasks"){
            let data = await fs.readFile("data.json");
            res.setHeader("Access-Control-Allow-Origin","*");
            res.writeHead(200,{'Content-Type':'application/json'});
            setTimeout(()=>{
                res.end(data);
            },2000);
           }

             /*
           API Endpoint : /api/task
           HTTP Method : GET
           Params : _id
           Data Validations  : None 
           Desc : Read all the tasks from data.json and send the _id task as response
       */
        else if (req.method === "GET" && parsedURL.pathname === "/api/task") {
            let _id = parsedURL.query._id;
            let data = JSON.parse(await fs.readFile("data.json"));
            let index = data.findIndex(ele => ele._id === _id);

            if (index === -1) {
                res.writeHead(400, { 'Content-Type': "application/json" });
                return res.end(JSON.stringify({ message: "Invalid ID." }));
            }

            l
        }
        
    } catch (error) {
        // console.log(error);
        res.writeHead(500, { 'Content-Type': "application/json" });
        res.end(JSON.stringify({ error: "Something Went Wrong. Try Again Later" }));
    }

    
});


server.listen(port, ()=>{
    console.log(`Server Started at ${port}`);
});
