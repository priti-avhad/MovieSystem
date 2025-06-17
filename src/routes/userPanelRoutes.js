// User Panel Routes

const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersPanelCtrls");

router.get("/", userController.userDashboard);

// view movies
const userCtrl = require("../controllers/usersPanelCtrls");
router.get("/movies", userCtrl.showMoviesList);

// rating and Review Movies
router.get("/rate", userController.getRatingForm);
router.post("/submit-rating", userController.submitRating);
router.get("/ratings", userController.showAllRatings);
// User Panel Routes

module.exports = router;
