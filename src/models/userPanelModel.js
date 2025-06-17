//get view all movies

const db = require("../config/db");

exports.getAllMovies = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM movies", (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// Insert a rating into the database
exports.insertRating = (uid, mid, rating, review, callback) => {
  const sql = `insert into rating (uid,mid,rating, review, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())`;
  db.query(sql, [uid, mid, rating, review], (err, result) => {
    if (err) {
      console.error("❌ Database Error:", err);
      return callback(err);
    }
    console.log("Rating inserted successfully");
    callback(null, result);
  });
};

exports.getAllRatings = (callback) => {
  const sql = `
    SELECT r.*, u.uname, m.title 
    FROM rating r 
    JOIN user u ON r.uid = u.uid 
    JOIN movies m ON r.mid = m.mid 
    ORDER BY r.created_at DESC
  `;
  db.query(sql, callback);
};
