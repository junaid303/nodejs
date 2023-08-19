const http = require("http");
const fs = require("fs/promises");

//const port = 1234;

const server = http.createServer(async(req, res)=>{
   try {
    if(req.method==='GET' && req.url === "/data"){
        res.writeHead(200,{'Content-Type':"application/json"});
        const data = await fs.readFile("./data.json");
        res.end(data);
    }else if (req.method === "GET" && req.url=== "/"){
        res.writeHead(200,{'Content-Type':"text/html"});
        const data2 = await fs.readFile("index.html")
            res.end(data2);
        
    }
   } catch (error) {
    console.error(error);
   } 
    
});

server.listen(port, ()=>{
    console.log(`Server started at ${port}`);
});