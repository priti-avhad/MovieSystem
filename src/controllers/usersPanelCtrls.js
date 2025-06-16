 // user Dashboard
exports.userDashboard = (req, res) => {
  res.render("UserPanel"); 
};



//view movies

const movieModel = require("../models/userPanelModel");

exports.showMoviesList = async (req, res) => {
  try {
    const movies = await movieModel.getAllMovies(); 
    res.render('userPanel', { viewFile: 'userViewMovies', movies });
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).send("Internal Server Error");
  }
};

// rating and Review Mvoies

const RatingModel = require("../models/userPanelModel");

// Show rating form
exports.getRatingForm = (req, res) => {
  const movieId = req.query.mid || 1; 
  res.render("userRatings", { movieId, ratings: null }); 
};

// Submit the rating
exports.submitRating = (req, res) => {
  const { rating, review } = req.body;
  const uid = 1; // Static user ID for testing
  const mid = req.query.mid || 1;

  RatingModel.insertRating(uid, mid, rating, review, (err) => {
    if (err) {
      console.log("❌ Error inserting rating:", err);
      return res.status(500).send("Database error");
    }
    res.redirect(`/user-rating?mid=${mid}`);
  });
};

// Show all ratings (optional usage)
exports.showAllRatings = (req, res) => {
  RatingModel.getAllRatings((err, results) => {
    if (err) {
      console.log("❌ Error fetching ratings:", err);
      return res.status(500).send("Database error");
    }
    res.render("userRatings", { movieId: null, ratings: results });
  });
};
