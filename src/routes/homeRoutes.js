const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeCtrl");

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    req.session.redirectAfterLogin = req.originalUrl;
    return res.redirect('/login?error=login_required');
   }
}

// Home Page Route
router.get('/', homeController.home);

// Protected Watch Route
router.get('/watch/:movieId', isAuthenticated, homeController.watchMovie);

module.exports = router;
