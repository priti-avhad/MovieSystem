const movieModel = require("../models/moviesAddModel");
const conn = require('../config/db');

exports.addMovie = async (req, res) => {
  try {
    const {
      title, description, releasedate, genre,
      director, language, country, budget,
      revenue, runtime, trailer_url, movie_url
    } = req.body;

    const posterurl = req.file ? "/uploads/" + req.file.filename : null;

    const movieData = {
      title,
      description,
      release_date: releasedate,
      genre,
      director,
      language,
      country,
      budget,
      revenue,
      runtime,
      trailer_url,
      movieurl: movie_url
    };

    movieModel.insertMovie(movieData, posterurl, (err, result) => {
      if (err) {
        console.error("DB Insert Error:", err);
        return res.render("AdminPanel.ejs", {
          main_content: "AddMovie",
          msg: "Failed to add movie. Please try again."
        });
      }

      res.render("AdminPanel.ejs", {
        main_content: "AddMovie",
        msg: "🎉 Movie added successfully!"
      });
    });

  } catch (err) {
    console.error("Add Movie Error:", err);
    res.render("AdminPanel.ejs", {
      main_content: "AddMovie",
      msg: null
    });
  }
};
// view Movies
exports.viewMovies = (req, res) => {
  movieModel.getAllMovies((err, result) => {
    if (err) {
      log(" Error while geting getAllMovies ", err);
    }
    // console.log(result);
    return res.render("AdminPanel.ejs", {main_content:"viewMovies" ,movies: result });
    
  });
};


exports.AdminviewMovie = (req, res) => {
  const movieId = req.params.mid;
  console.log("Requested Movie ID:", movieId); 

  movieModel.getAllData(movieId, (err, results) => {
    if (err) return res.status(500).send("Database error");
    if (results.length === 0) return res.status(404).send("Movie not found");

    res.render("AdminPanel.ejs", {main_content:"AdminViewMovie",  movie: results[0] });
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

    const msg = req.session.msg;
    req.session.msg = null; // clear it after use

    return res.render("AdminPanel.ejs", { main_content: "editMovie",movie: result[0],msg: msg});
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
      req.session.msg = "Movie updated successfully!";
      res.redirect(`/admin/movies/edit/${movieId}`);    });
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


//AdminViewUsers

exports.AdminUserView = (req, res) => {
  conn.query('SELECT * FROM user ORDER BY uid', (err, results) => {
    if (err) {
      console.log('Error fetching users:', err);
      return res.status(500).send('Database error');
    }

    res.render('AdminPanel', {title: 'Manage Users',main_content: 'AdminUserViews',users: results, msg: null});
  });
};

//Admin specific user data view 
exports.viewUserById = (req, res) => {
  const uid = req.params.uid;

  movieModel.getUserById(uid, (err, user) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).send('Internal Server Error');
    }
    if (!user) {
      return res.status(404).send('User not found');
    }

    //res.render('AdminUserDataView', { user });
    res.render("AdminPanel.ejs", {main_content:"AdminUserDataView",  user:user });

  });
};

//Admin panel user specific data delete
exports.deleteUser = (req, res) => {
  const userId = req.params.uid;

  movieModel.deleteUserById(userId, (err, result) => {
    if (err) {
      console.error('Error deleti ng user:', err);
      return res.status(500).send('Internal Server Error');
    }
    const successMessage = req.session.successMessage || null;
    delete req.session.successMessage;
    res.redirect('/AdminUserViews');  
  });
};

//Admin panel show user ratings and reviews

exports.showRatingsForm = (req, res) => {
  movieModel.getAllRatings((err, ratings) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching ratings");
    }
    // Render the EJS and pass the ratings data
    res.render("AdminPanel.ejs", {main_content:"AdminRatingView",  ratings });

  });
};

// View Admin Profile
exports.getAdminProfile = (req, res) => {
  const admin = req.session.admin;

  // ✅ Fix infinite redirect loop
  if (!admin) return res.redirect('/admin/AdminProfileView');

  res.render('AdminPanel.ejs', {
    main_content: 'AdminProfileView',
    admin,
  });
};

// Show Update Form
exports.getAdminProfileUpdate = (req, res) => {
  const admin = req.session.admin;
  if (!admin) return res.redirect('/admin/login');

  const msg = req.session.msg;
  const error = req.session.error;
  req.session.msg = null;
  req.session.error = null;

  res.render('AdminPanel', {
    main_content: 'AdminProfileUpdate',
    admin,
    msg,
    error
  });
};

// Handle POST Update
exports.postAdminProfileUpdate = (req, res) => {
  const { uid } = req.session.admin;
  const { uname, email } = req.body;

  movieModel.updateProfile(uid, uname, email, (err, result) => {
    if (err) {
      req.session.error = 'Failed to update profile.';
      return res.redirect('/AdminProfileUpdate');
    }

    // Update session
    req.session.admin.uname = uname;
    req.session.admin.email = email;

    req.session.msg = 'Data updated successfully!';
    res.redirect('/AdminProfileUpdate');
  });
};
