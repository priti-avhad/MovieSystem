const movieModel = require("../models/viewMoviesModel");

exports.viewMovies = (req, res) => {
  movieModel.getAllMovies((err, result) => {
    if (err) {
      console.error("Error fetching movies:", err);
      return res.status(500).send("Database error");
    }

    res.render("AdminPanel.ejs", {
      main_content: "viewmovies",  
      movies: result
    });
  });
};
