const movieModel = require("../models/userPanelModel");
const RatingModel = require("../models/userPanelModel");

// user Dashboard
exports.userDashboard = (req, res) => {
  res.render("UserPanel");
};

exports.showMoviesList = async (req, res) => {
  try {
    const movies = await movieModel.getAllMovies();
    res.render("userPanel", { viewFile: "userViewMovies", movies }); // userId
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getRatingForm = (req, res) => {
  const movieId = req.query.mid;
  const userId = req.query.uid;

  if (!movieId || !userId) {
    return res.status(400).send("❌ Missing movieId or userId in URL");
  }

  res.render("userRatings", {
    movieId,
    userId,
    ratings: null,
  });
};

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
    res.redirect(`/user-rating?mid=${mid}`);
  });
};

// Show all ratings
exports.showAllRatings = (req, res) => {
  const movieId = req.query.mid;
  const userId = req.query.uid;
  const success = req.query.success;

  // show rating page

  // RatingModel.getAllRatings((err, results) => {
  //   if (err) {
  //     console.error("❌ Fetch Error:", err);
  //     return res.status(500).send("Database error");
  //   }

  //   res.render("userViewMovies", { // wrong view file
  //     movieId,
  //     userId,
  //     ratings: results,
  //     success,
  //   });
  // });
};

//view movies

// rating and Review Mvoies

// Submit the rating
exports.submitRating = (req, res) => {
  console.log("Received request to submit rating");
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
    res.redirect(`/user/movies?mid=${mid}&success=Review added successfully`);
  });
};

// Controller to load watch history
exports.watchHistoryMovies = (req, res) => {
  const uid = req.user.id;
  console.log("Fetching watch history for user ID:", uid);
  movieModel.getUserWatchHistory(uid, (err, history) => {
    if (err) {
      console.error("❌ Error fetching watch history:", err);
      return res.status(500).send("Error loading watch history");
    }
    console.log("✅ Watch history fetched successfully");
    // Render main layout with dynamic view
    res.render("userPanel", {
      viewFile: "userHistoryView",
      history,
      movies: null,
    });
  });
};

// Get User Profile
exports.getUserProfile = (req, res) => {
  const userId = req.user.id;

  movieModel.getUserById(userId, (err, user) => {
    if (err) {
      console.error("❌ Error fetching user profile:", err);
      return res.status(500).send("Error loading profile");
    }

    console.log("✅ User profile fetched successfully");
    res.render("UserPanel", { viewFile: "userProfile", user, movies: [] }); // <-- ADD THIS
  });
};

// Logout User
exports.logoutUser = (req, res) => {
  try {
    res.clearCookie("token");
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.log("❌ Session destroy error:", err);
        }
        return res.redirect("/login");
      });
    } else {
      return res.redirect("/login");
    }
  } catch (err) {
    console.error("❌ Logout failed:", err);
    res.status(500).send("Logout failed");
  }
};
