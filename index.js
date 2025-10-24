import http from "http";

const server = http.createServer((req,res)=>{
    res.write("Hello World")
    res.end()
});
const port =5000;
server.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})