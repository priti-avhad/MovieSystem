// User Panel Routes
let authenticateToken = require("../middleware/viewMoviesMidd");

const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersPanelCtrls");

router.get("/", userController.userDashboard);

// view movies
const userCtrl = require("../controllers/usersPanelCtrls");
router.get("/movies", userCtrl.showMoviesList); 

// rating and Review Movies
router.get("/rate", userController.getRatingForm);
router.post("/submit-rating/:mid", userController.submitRating);
router.get("/ratings", userController.showAllRatings);

// watchHistory
router.get("/add-to-watchlist/:mid", userController.addToWatchlist);
router.get("/history", userController.viewWatchHistory);
// show user profile
router.get('/profile', userController.getUserProfile);         // ✅ Must be defined
router.get('/profile/edit', userController.getEditProfile);    // ✅ Must be defined
router.post('/profile/edit', userController.postEditProfile);  // ✅ Must be defined

// user show all rating
router.get("/user/ratings",userController.showAllRatingsPage);

// Logout user
router.get('/logout', userController.logoutUser);
module.exports = router;

//new added 
router.get("/add-to-watchlist/:mid", userController.addToWatchlist);



