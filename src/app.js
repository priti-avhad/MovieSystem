let express = require("express");
let app = express();
let session = require("express-session");
let multer = require("multer");
require("dotenv").config();

let cookieParser = require("cookie-parser");
let authenticateToken = require("../src/middleware/authenticateToken.js");

// Database
let conn = require("./config/db.js");

// Routers
let authRoutes = require("../src/routes/registerRoutes");
let homeRoutes = require("../src/routes/homeRoutes");
let adminRoutes = require("../src/routes/adminRoutes");
let movieRoutes = require("../src/routes/moviesAddRoutes");
let userRoutes = require("./routes/userPanelRoutes.js");
let apiRoutes = require("./routes/userPanelRoutes");                 // API for /api/ratings

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/images", express.static("images"));
app.set("view engine", "ejs");
app.use(cookieParser());

// Session Config
app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
  })
);


app.use("/", authRoutes); // login/register
app.use("/", homeRoutes); // homepage/dashboard
app.use("/admin", adminRoutes); // admin dashboard
app.use("/admin/movies", movieRoutes); // admin movie CRUD

app.use("/",movieRoutes);

app.use("/user", authenticateToken, userRoutes); // all user routes including profile

//user Profile

// app.use("/profile", userRoutes); 

app.use("/",movieRoutes);

app.use("/profile", authenticateToken,userRoutes); 


// logout user
app.use("/",authenticateToken, userRoutes);

app.use("/home",authenticateToken, apiRoutes); // includes /api/ratings


const userPanelRoutes = require("./routes/userPanelRoutes.js");
app.use("/user", userPanelRoutes);




// Export app
module.exports = app;

