import express from "express";
const app=express();
app.get("/test",(request,response)=>{
    return response.send("Test sent!");
});
app.post("/test-post",(request,response)=>{
    return response.send("Test POST sent!");
});
app.listen(3000,()=>console.log("Server is running YEET!"));