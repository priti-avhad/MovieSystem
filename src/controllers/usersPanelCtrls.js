// user Dashboard
exports.userDashboard = (req, res) => {
  res.render("UserPanel");
};

//view movies

const movieModel = require("../models/userPanelModel");

exports.showMoviesList = async (req, res) => {
  try {
    const movies = await movieModel.getAllMovies();
    res.render("userPanel", { viewFile: "userViewMovies", movies });
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
  log("Received request to submit rating");
  const { rating, review } = req.body;
  const uid = req.user.id; // Assuming user ID is stored in req.user
  console.log("Form Data:", { uid, rating, review });
  const mid = req.params.mid || 1;
  if (!uid || !mid || !rating) {
    return res.status(400).send("❌ Missing user, movie, or rating");
  }
  RatingModel.insertRating(uid, mid, rating, review, (err) => {
    if (err) {
      console.log("❌ Error inserting rating:", err);
      return res.status(500).send("Database error");
    }
    res.redirect(`/user-rating?mid=${mid}&success=Review added successfully`);
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

// user Dashboard
exports.userDashboard = (req, res) => {
  res.render("UserPanel");
};

//view movies

//const movieModel = require("../models/userPanelModel");

exports.showMoviesList = async (req, res) => {
  try {
    const movies = await movieModel.getAllMovies();
    res.render("userPanel", { viewFile: "userViewMovies", movies }); // userId
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).send("Internal Server Error");
  }
};

//const RatingModel = require("../models/userPanelModel");

// Show rating form
// call not
exports.getRatingForm = (req, res) => {
  const movieId = req.query.mid;
  const userId = req.query.uid;

  if (!movieId || !userId) {
    return res.status(400).send("❌ Missing movieId or userId in URL");
  }
  console.log("UserId ", userId);

  res.render("userRatings", {
    movieId,
    userId,
    ratings: null,
  });
};

// Submit the rating
exports.submitRating = (req, res) => {
  const { rating, review, mid } = req.body;
  const uid = req.user.id;
  console.log("Form Data:", { mid, rating, review, uid });

  if (!uid || !mid || !rating) {
    return res.status(400).send("❌ Missing user, movie, or rating");
  }

  RatingModel.insertRating(uid, mid, rating, review, (err, result) => {
    if (err) {
      console.error("❌ Database Error:", err);
      return res.status(500).send("Database error");
    }
    console.log("Rating submitted successfully:", result);
    // Redirect to the ratings page after submission
    res.redirect(`/user/movies?mid=${mid}&success=1`);
  });
};

// Show all ratings
exports.showAllRatings = (req, res) => {
  const movieId = req.query.mid;
  const userId = req.query.uid;
  const success = req.query.success;

  RatingModel.getAllRatings((err, results) => {
    if (err) {
      console.error("❌ Fetch Error:", err);
      return res.status(500).send("Database error");
    }

    res.render("userViewMovies", {
      movieId,
      userId,
      ratings: results,
      success, // ✅ pass success flag to EJS
    });
  });
};
