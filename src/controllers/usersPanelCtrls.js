const movieModel = require("../models/userPanelModel");
const RatingModel = require("../models/userPanelModel");

const getUserIdFromSession = (req) => req.session?.uid || req.session?.user?.uid || null;



// user Dashboard
exports.userDashboard = (req, res) => {
  res.render("UserPanel");
};

// exports.showMoviesList = async (req, res) => {
//   try {
//     const movies = await movieModel.getAllMovies();
//     res.render("userPanel", { viewFile: "userViewMovies", movies }); // userId
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };

exports.showMoviesList = (req, res) => {
  movieModel
    .getAllMovies()
    .then((movies) => {
      res.render("userPanel", { viewFile: "userViewMovies", movies }); // userId
    })
    .catch((err) => {
      console.error("Error fetching movies:", err);
      res.status(500).send("Error loading movies.");
    });
};

exports.getRatingForm = (req, res) => {
  const movieId = req.query.mid;
  const userId = req.query.uid;

  if (!movieId || !userId) {
    return res.status(400).send(" Missing movieId or userId in URL");
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
    return res.status(400).send(" Missing user, movie, or rating");
  }
  RatingModel.insertRating(uid, mid, rating, review, (err) => {
    if (err) {
      console.log(" Error inserting rating:", err);
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
  //     console.error(" Fetch Error:", err);
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
  const uid = req.user.uid; // Assuming user ID is stored in req.user
  console.log("Form Data:", { uid, rating, review });
  const mid = req.params.mid || 1;
  if (!uid || !mid || !rating) {
    return res.status(400).send(" Missing user, movie, or rating");
  }
  RatingModel.insertRating(uid, mid, rating, review, (err) => {
    if (err) {
      console.log(" Error inserting rating:", err);
      return res.status(500).send("Database error");
    }
    res.redirect(`/user/movies?mid=${mid}&success=Review added successfully`);
  });
};

// show all rating

exports.showAllRatingsPage = (req, res) => {
  RatingModel.getAllRatings((err, results) => {
    if (err) {
      console.log("Error fetching ratings:", err);
      return res.status(500).send("Internal Server error");
    }
    res.render("UserPanel", {
      viewFile: "userViewRating",
      ratings: results,
      movies: req.query.success || null,
    });
  });
};

// Controller to load watch history

exports.addToWatchlist = (req, res) => {
  const uid = req.user.uid;
  const movieUrl = req.query.movieUrl;

  const mid = req.params.mid;

  movieModel.addToWatchlist(uid, mid, (err, result) => {
    if (err) {
      console.error("Error adding to watchlist:", err);
      return res.status(500).send("Internal Server Error");
    }
    // res.redirect("/user/history");
    res.redirect(movieUrl);
  });
};
// exports.addToWatchlist = (req, res) => {
//   const uid = req.session.uid;
//   //const uid =16;
//   const mid = req.params.mid;
//   const movieUrl = req.query.movieUrl;

//   // console.log("Fetching user Watch Movie History for ID:", uid);

//   if (!mid) return res.status(400).send("Missing mid");
//   if (!uid) return res.status(400).send("Missing uid");

//   // console.log(" User clicked to watch a movie!");
//   // console.log(" User ID (uid):", uid);
//   // console.log(" Movie ID (mid):", mid);

//   movieModel.addToWatchlist(uid, mid, (err, result) => {
//     if (err) {
//       console.error(" Error adding to watchlist:", err);
//       return res.status(500).send("Database error");
//     }

//     res.redirect(movieUrl);
//   });
// };



exports.viewWatchHistory = (req, res) => {
  const uid = req.session?.uid || req.user?.uid;


  if (!uid) {
    return res.status(400).send("User not logged in or UID missing");
  }

  movieModel.getUserWatchHistory(uid, (err, history) => {
    if (err) {
      console.error("Error fetching history:", err);
      return res.status(500).send("Internal Server Error");
    }

    console.log(" Watch history from DB:", history); 

    res.render("UserPanel", {
      viewFile: "userHistoryView",
      history,
      movies: [],
    });
  });
};

// Delete watch history(specific history)
exports.deleteHistory = async (req, res) => {
  const historyId = req.params.id;

  try {
    await movieModel.deleteHistoryById(historyId);
    res.redirect("/user/viewWatchHistory");
  } catch (err) {
    console.error("Error deleting history:", err);
    res.status(500).send("Internal Server Error");
  }
};

// delete all watch history
exports.clearHistory = (req, res) => {
  movieModel.clearAllHistory((err, result) => {
    if (err) {
      console.error("Error clearing history:", err);
      return res.status(500).send("Internal Server Error");
    }

    res.redirect("/user/viewWatchHistory");
  });
};
// Get User Profile

exports.getUserProfile = (req, res) => {
  const userId = req.user.uid;


  movieModel.getUserById(userId, (err, user) => {
    if (err) {
      console.error(" Error fetching user profile:", err);
      return res.status(500).send("Error loading profile");
    }


    res.render("UserPanel", {
      viewFile: "userProfile",
      user,
      movies: [],
      successMessage: null 
    });
  });
};

// Load Edit Profile form
exports.getEditProfile = (req, res) => {
  const userId = req.user.uid;

  movieModel.getUserById(userId, (err, user) => {
    if (err) {
      console.error(" Error loading edit profile:", err);
      return res.status(500).send("Error loading edit form");
    }

    res.render("UserPanel", {
      viewFile: "userProfileUpdate",
      user,
      movies: [],
      successMessage: null
    });
  });
};

// Handle Edit Profile form submission
exports.postEditProfile = (req, res) => {
  const userId = req.user.uid;
  const { uname, email } = req.body;

  if (!uname || !email) {
    return res.status(400).send("Username and Email are required.");
  }

  const updatedData = {
    username: uname,
    email
  };

  movieModel.updateUserById(userId, updatedData, (err, result) => {
    if (err) {
      console.error(" Error updating profile:", err);
      return res.status(500).send("Error updating profile");
    }

    // ✅ Only re-fetch and render once — avoid duplicate render
    movieModel.getUserById(userId, (err, user) => {
      if (err) {
        console.error(" Error fetching updated user:", err);
        return res.status(500).send("Error loading updated profile");
      }

      const successMessage = "Profile updated successfully!";
      res.render("UserPanel", {
        viewFile: "userProfileUpdate", // or "userProfile" if you want to show view page after update
        user,
        movies: [],
        successMessage
      });
    });
  });
};

// Logout User
exports.logoutUser = (req, res) => {
  console.log("Logout user");

  try {
    res.clearCookie("token");
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.log(" Session destroy error:", err);
        }
        return res.redirect("/login");
      });
    } else {
      return res.redirect("/login");
    }
  } catch (err) {
    console.error(" Logout failed:", err);
    res.status(500).send("Logout failed");
  }
};


// recommendController
const natural = require("natural");
const cosineSimilarity = require("compute-cosine-similarity");

const TfIdf = natural.TfIdf;

function createDocument(movie) {
  return (movie.genre || "").split(',').join(" ").toLowerCase();
}

function buildTfIdf(movies) {
  const tfidf = new TfIdf();
  movies.forEach(movie => tfidf.addDocument(createDocument(movie)));
  return tfidf;
}

function getVector(tfidf, docIndex) {
  return tfidf.listTerms(docIndex).map(term => term.tfidf);
}

function getRecommendations(movies, watchedMovieIds, topN =2) {
  const tfidf = buildTfIdf(movies);
  const watchedIndexes = watchedMovieIds
    .map(id => movies.findIndex(m => m.mid === id))
    .filter(i => i !== -1);

  const baseVectors = watchedIndexes.map(index => getVector(tfidf, index));

  const scores = movies.map((movie, index) => {
    if (watchedIndexes.includes(index)) return { movie, score: -1 };
    const vector = getVector(tfidf, index);
    const score = Math.max(...baseVectors.map(base => cosineSimilarity(base, vector)));
    return { movie, score };
  });

  return scores
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .map(s => s.movie);
}
exports.recommendForUser = (req, res) => {
  const userId = req.user?.uid; // Use optional chaining to avoid crash
  console.log("User ID:", userId);

  if (!userId) return res.status(401).send("User not logged in");

  movieModel.getAll((err, allMovies) => {
    if (err) return res.status(500).send("Movie fetch error");

    movieModel.getWatched(userId, (err2, watchedMovies) => {
      if (err2) return res.status(500).send("Watchlist fetch error");

      const watchedIds = watchedMovies.map(row => row.mid);
      const recommendations = getRecommendations(allMovies, watchedIds);

      // Save recommendations into DB
      recommendations.forEach((movie) => {
        movieModel.saveRecommendation(userId, movie.mid, (err3) => {
          if (err3) {
            console.error(" Failed to insert recommendation:", err3);
          } else {
            console.log(` Saved recommendation: uid=${userId}, mid=${movie.mid}`);
          }
        });
      });
      res.render("UserPanel", {
        viewFile: "recommend",
        movies: recommendations,
      });
    }); 
  });   
};
