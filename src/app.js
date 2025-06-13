let express = require("express");
let app = express();
let bodyparser = require("body-parser");
let session = require("express-session");

require("dotenv").config(); // Just in case you're using .env

let conn = require("../src/config/db.js");
let regRouter = require("../src/routes/registerRoutes");
let homeRouter = require("../src/routes/homeRoutes");
let authRoutes=require("../src/routes/registerRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');

app.use("/", authRoutes);
app.use("/", homeRouter); 
app.use("/", regRouter);

module.exports = app;