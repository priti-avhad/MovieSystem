const express = require("express");
const router = express.Router();

const movieCtrl = require("../controllers/viewMovieCtrl");

router.get("/viewmovies", movieCtrl.viewMovies);

module.exports = router;
