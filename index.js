let app=require("./src/app.js");


let Port=3000;
app.listen(Port,(req,res)=>{
    console.log("Server Start"+Port);
});