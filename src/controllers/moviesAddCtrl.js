const movieModel = require("../models/moviesAddModel");

exports.addMove = (req, res) => {
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
    res.render("AdminPanel.ejs",{
          main_content : "AddMovie",
      msg:"Movie saved successfully!"});
  });
};