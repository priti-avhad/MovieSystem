
const movieModel = require('../models/movieModel');


exports.home = (req, res) => {
  movieModel.getAllMovies((err, movies) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send("Database error");
    }
    res.render('home', { movies });
  });
};

exports.watchMovie = (req, res) => {
  const movieId = req.params.movieId;

  movieModel.getMovieById(movieId, (err, movie) => {
    if (err || !movie) {
      return res.status(404).send("Movie not found");
    }

    res.render("watchMovie", { movie });
  });
};
