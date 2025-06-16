const express = require("express");
const router = express.Router();
const path = require("path");

const uploadMiddleware = require("../middleware/multer"); // Import Multer middleware
const movieCtrl = require("../controllers/moviesAddCtrl"); // Controller


// Route: Render Add Movie Form
router.get("/add-movie", (req, res) => {
  res.render("AdminPanel.ejs", {
    main_content: "AddMovie"
  });
});

// Route: View All Movies
router.get("/viewmovies", movieCtrl.viewMovies);

// Route: Show Edit Movie Form
router.get("/edit/:mid", movieCtrl.editMovieForm);

// ✅ Route: Handle Movie Update with poster upload
router.post("/edit/:mid", uploadMiddleware.single("poster"), movieCtrl.updateMovie);

//delete movie
router.get('/delete/:mid', movieCtrl.deleteMovie);
router.post('/delete/:mid', movieCtrl.deleteMovie);


module.exports = router;
