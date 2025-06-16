let express = require("express");
let app = express();
let session = require("express-session");
let multer=require("multer");
require("dotenv").config();

let conn = require("../src/config/db.js");



// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

// Routers
let authRoutes = require("../src/routes/registerRoutes");
let homeRoutes = require("../src/routes/homeRoutes");
let adminRoutes = require("../src/routes/adminRoutes");
let movieRoutes = require("../src/routes/moviesAddRoutes"); 
let  { viewMovies } = require("./controllers/viewMovieCtrl.js");
let viewMovieRoutes = require("../src/routes/viewMovieRoutes");
const editMovieRoutes = require("../src/routes/editMovieRoute");




// Session
app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
app.use("/", authRoutes);
app.use("/", homeRoutes);
app.use("/", adminRoutes);
app.use('/', movieRoutes);
app.use("/admin/movies", movieRoutes); 
app.use("/admin/movies", require("./routes/moviesAddRoutes"));


// /admin
// /user

// Export app
module.exports = app;
