const movieModel = require("../models/moviesAddModel");

exports.addMove = (req, res) => {
  const movieData = req.body;

  if (!req.file) {
    return res.status(400).send("Poster image is required");
  }

  const posterurl = "/images/" + req.file.filename;
  console.log("movie url:", movieData.movieurl);

  movieModel.insertMovie(movieData, posterurl, (err, result) => {
    if (err) {
      console.error("Insert Error:", err);
      return res.status(500).send("Failed to save movie");
    }
    res.send("Movie saved successfully!");
  });
};
