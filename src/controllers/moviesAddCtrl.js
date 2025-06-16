const movieModel = require("../models/moviesAddModel");
const conn = require('../config/db');

exports.addMovie = (req, res) => {
  const movieData = req.body;

  if (!req.file) {
    return res.status(400).send("Poster image is required");
  }

  const posterurl = "/images/" + req.file.filename;

  movieModel.insertMovie(movieData, posterurl, (err, result) => {
    if (err) {
      console.error("Insert Error:", err);
      return res.status(500).send("Failed to save movie");
    }
    res.render("AdminPanel.ejs", {
      main_content: "AddMovie",
      msg: "Movie saved successfully!",
    });
  });
};

// view Movies
exports.viewMovies = (req, res) => {
  console.log("View All movies");
  movieModel.getAllMovies((err, result) => {
    if (err) {
      log(" Error while geting getAllMovies ", err);
    }
    // console.log(result);
    return res.render("AdminPanel.ejs", {main_content:"viewMovies" ,movies: result });
  });
};

// edit Movie with id
exports.editMovieForm = (req, res) => {
  const movieId = req.params.mid;
  console.log("mId:" + movieId);
  movieModel.getMovieById(movieId, (err, result) => {
    if (err) {
      console.log("Error in GetMovie ById ", err);
    }
    console.log(result);
    // return res.render("editMovie", { movie: result[0] });
    return res.render("AdminPanel.ejs",{main_content:"editMovie", movie:result[0]});
  });
};

//Update Movie Form 

exports.updateMovie = (req, res) => {
  try {
    const movieId = req.params.mid;
    if (!req.body) {
      return res.status(400).send("Form body not received.");
    }

    const {title, description,releasedate,genre,director,language,country,budget,revenue,runtime,trailer_url,movie_url,existingPoster } = req.body;
    const posterurl = req.file ? "/images/" + req.file.filename: existingPoster || null; 

    const movieData = {title,description,releasedate,genre,director,language,country, budget: parseFloat(budget),revenue: parseFloat(revenue), runtime: parseInt(runtime),
      posterurl,trailerurl: trailer_url, movieurl: movie_url,};

      movieModel.updateMovie(movieId, movieData, (err) => {
      if (err) {
        console.error("Update DB Error:", err);
        return res.status(500).send("Failed to update movie");
      }
      res.redirect(`/admin/movies/edit/${movieId}?msg=Movie updated successfully`);
    });
  } catch (err) {
    console.error("Fatal Error in updateMovie:", err);
    return res.status(500).send("Internal Server Error");
  }
};


//delete movie
exports.deleteMovie = (req, res) => {
  const movieId = req.params.mid;

  movieModel.deleteMovieById(movieId, (err, result) => {
    if (err) {
      console.error('Error deleting movie:', err);
      return res.status(500).send('Internal Server Error');
    }
    
    req.session.successMessage = 'Movie deleted successfully!';
    res.redirect('/viewmovies'); 
  });
};
