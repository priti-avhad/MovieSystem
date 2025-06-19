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



exports.addToWatchlist = (uid, mid, callback) => {
  const sql = "INSERT INTO watchlist (uid, mid, added_at) VALUES (?, ?, NOW())";
  db.query(sql, [uid, mid], callback);
};



exports.getUserWatchHistory = (uid, callback) => {
  const sql = `
    SELECT w.*, m.title, m.description, m.posterurl
    FROM watchlist w
    JOIN movies m ON w.mid = m.mid
    WHERE w.uid = ?
    ORDER BY w.added_at DESC
  `;

  db.query(sql, [uid], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};




// show Profile User

exports.getUserById = (id, callback) => {
  const sql = `select * from user where uid = ?`;
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("❌ Error fetching user profile:", err);
      return callback(err);
    }
    if (results.length === 0) {
      return callback(new Error("User not found"));
    }
    callback(null, results[0]);
  });
};

exports.updateUserById = (id, data, callback) => {
  const { username, email } = data;

  const sql = `
    UPDATE user 
    SET uname = ?, email = ?, updated_at = NOW() 
    WHERE uid = ?
  `;

  db.query(sql, [username, email, id], (err, result) => {
    if (err) {
      console.error("❌ Error updating user profile:", err);
      return callback(err);
    }
    callback(null, result);
  });
};
