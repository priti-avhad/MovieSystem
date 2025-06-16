// src/routes/adminRoutes.js

const express = require("express");
const router = express.Router();
const movieCtrl = require("../controllers/movieCtrl");
let upload=require("../middleware/multer");

// Admin Dashboard default
router.get("/admin", movieCtrl.showAdminPanel);

// Add Movie Form
router.get("/admin/movies/create", movieCtrl.showAddMovieForm);

// View Movies
router.get("/admin/movies/list", movieCtrl.showViewMovies);

module.exports = router;
