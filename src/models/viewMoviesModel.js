let conn = require("../config/db.js");

exports.getAllMovies = (callback) => {
  const query = "SELECT * FROM movies"; 
  conn.query(query, (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};
