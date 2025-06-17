let express = require("express");
let app = express();
let session = require("express-session");
let multer = require("multer");
require("dotenv").config();
let authenticateToken = require("../src/middleware/authenticateToken.js");

let conn = require("../src/config/db.js");

// Routers
let authRoutes = require("../src/routes/registerRoutes");
let homeRoutes = require("../src/routes/homeRoutes");

let adminRoutes = require("../src/routes/adminRoutes");
let movieRoutes = require("../src/routes/moviesAddRoutes");

let adminRoute = require("../src/routes/adminRoutes");
// User Panel
let userRoute = require("./routes/userPanelRoutes.js");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use('/images', express.static('images')); 
app.set("view engine", "ejs");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

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

app.use("/", adminRoutes);
app.use("/admin/movies", movieRoutes);

app.use("/admin", adminRoute);

//Routes user
app.use("/user", authenticateToken, userRoute);

// Export app
module.exports = app;
