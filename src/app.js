let express = require("express");
let app = express();
let session = require("express-session");
require("dotenv").config();

let conn = require("../src/config/db.js");

// Routers
let authRoutes = require("../src/routes/registerRoutes");
let homeRoutes = require("../src/routes/homeRoutes");
let adminRoutes=require("../src/routes/adminRoutes")
const movieRoutes = require('../src/routes/adminRoutes');


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: true,
}));

// Routes
app.use("/", authRoutes);   // handles /register, /login
app.use("/", homeRoutes);   // handles homepage

app.use("/", adminRoutes);
app.use('/admin/movies', movieRoutes);

// Export the app
module.exports = app;
