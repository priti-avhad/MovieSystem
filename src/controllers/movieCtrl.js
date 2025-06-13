// src/controllers/movieCtrl.js

exports.showAdminPanel = (req, res) => {
  res.render("AdminPanel", { view: "" }); // default dashboard
};

exports.showAddMovieForm = (req, res) => {
  res.render("AdminPanel", { view: "addmovie" });
};

exports.showViewMovies = (req, res) => {
  res.render("AdminPanel", { view: "viewmovies" });
};
