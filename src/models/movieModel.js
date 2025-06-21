const conn = require("../config/db.js");


exports.getAllMovies = (callback) => {
    const sql = "SELECT * FROM movies";
    conn.query(sql, (err, results) => {
      if (err) return callback(err);
      callback(null, results); // return array of all movies
    });
  };
exports.getMovieById = (mid, callback) => {
  const sql = "SELECT * FROM movies WHERE mid = ?";
  conn.query(sql, [mid], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, null);
    callback(null, results[0]); // Return full movie record
  });
};
