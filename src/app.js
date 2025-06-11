let express=require("express");
let app=express();
let bodyparser=require("body-parser");
let session=require("express-session");


let conn=require("../src/config/db");
let regRouter=require("../src/routes/homeRoutes.js")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine','ejs');

const homeRoutes = require("./routes/homeRoutes.js");
app.use("/", homeRoutes);

module.exports=app