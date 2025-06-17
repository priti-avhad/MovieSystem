let express = require("express");
let app = express();
let session = require("express-session");
let multer=require("multer");
require("dotenv").config();

let conn = require("../src/config/db.js");

// Routers
let authRoutes = require("../src/routes/registerRoutes");
let homeRoutes = require("../src/routes/homeRoutes");
let movieRoutes = require("../src/routes/moviesAddRoutes"); 
let adminRoute = require("../src/routes/adminRoutes");
// User Panel
let userRoutes = require("./routes/userPanelRoutes.js");
let userRoute = require('./routes/userPanelRoutes.js');
let uRoute=require("../src/routes/userPanelRoutes");


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use('/images', express.static('images')); 
app.set("view engine", "ejs");

// Session
app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
  })
);

// Routes admin
app.use("/", authRoutes);
app.use("/", homeRoutes);
app.use('/', movieRoutes);
app.use("/admin/movies", movieRoutes); 
app.use("/admin/movies", require("./routes/moviesAddRoutes"));
app.use("/admin", adminRoute);


// /admin
// /user

//Routes user
app.use("/users", userRoutes);
app.use('/user', userRoute);
app.use("/user", uRoute);

// Export app
module.exports = app;
