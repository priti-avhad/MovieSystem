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
router.get('/profile', userController.getUserProfile);         
router.get('/profile/edit', userController.getEditProfile);    
router.post('/profile/edit', userController.postEditProfile);  

// user show all rating
router.get("/user/ratings",userController.showAllRatingsPage);

// Logout user
router.get('/logout', userController.logoutUser);
module.exports = router;

//new added 
router.get("/add-to-watchlist/:mid", userController.addToWatchlist);

//user history delete (specific history)
router.get("/viewWatchHistory", userController.viewWatchHistory); 
router.post("/deleteHistory/:id", userController.deleteHistory);  // Already correct

//user delete all history
router.post("/clearHistory", userController.clearHistory);


// recommend

router.get("/recommend", userController.recommendForUser);
