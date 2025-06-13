const conn = require("../config/db.js");

exports.addMove = (req, res) => {
  const {
    title, description, release_date, genre,
    director, language, country, budget,
    revenue, runtime, trailer_url
  } = req.body;

  if (!req.file) {
    return res.status(400).send("Poster image is required");
  }

  const posterurl = "/images/" + req.file.filename;

  const sql = `
    INSERT INTO movies 
    (title, description, releasedate, genre, director, language, country, budget, revenue, runtime, posterurl, trailerurl)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  conn.query(sql, [
    title, description, release_date, genre,
    director, language, country, budget, revenue,
    runtime, posterurl, trailer_url
  ], (err, result) => {
    if (err) {
      console.error("Insert Error:", err);
      return res.status(500).send("Failed to save movie");
    }
    res.send("Movie saved successfully!");
  });
};