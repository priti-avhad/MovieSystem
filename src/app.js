let express = require("express");
let app = express();
let session = require("express-session");
require("dotenv").config();

let conn = require("../src/config/db.js");

// Routers
let authRoutes = require("../src/routes/registerRoutes");
let homeRoutes = require("../src/routes/homeRoutes");
let adminRoutes = require("../src/routes/adminRoutes");
let movieRoutes = require("../src/routes/moviesAddRoutes"); 
let  { viewMovies } = require("./controllers/viewMovieCtrl.js");
let viewMovieRoutes = require("../src/routes/viewMovieRoutes.js");


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

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
app.use("/admin/movies", movieRoutes); 
app.use("/",viewMovieRoutes);



// Export app
module.exports = app;
