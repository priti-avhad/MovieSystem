const conn = require("../config/db.js");

exports.insertMovie = (movieData, posterurl, callback) => {
  const {
    title, description, release_date, genre,
    director, language, country, budget,
    revenue, runtime, trailer_url, movieurl
  } = movieData;

  const sql = `
    INSERT INTO movies 
    (title, description, releasedate, genre, director, language, country, budget, revenue, runtime, posterurl, trailerurl, movieurl)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    title, description, release_date, genre,
    director, language, country, budget, revenue,
    runtime, posterurl, trailer_url, movieurl
  ];

  conn.query(sql, values, callback);
};
