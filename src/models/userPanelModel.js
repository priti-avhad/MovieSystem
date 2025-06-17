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
    select r.*, u.uname, m.title 
    from rating r 
    join user u on r.uid = u.uid 
    join movies m on r.mid = m.mid 
    order by BY r.created_at DESC
  `;
  db.query(sql, callback);
};

// Get watch history for a user

exports.getUserWatchHistory = (uid, callback) => {
  const sql = `
   SELECT r.*, u.uname, m.title, m.genre, m.language 
FROM rating r 
JOIN user u ON r.uid = u.uid 
JOIN movies m ON r.mid = m.mid 
ORDER BY r.created_at DESC`;

  db.query(sql, [uid], (err, results) => {
    if (err) {
      console.error("❌ Error fetching watch history:", err);
      return callback(err);
    }
    callback(null, results);
  });
};

// show Profile User

exports.getUserById=(id,callback)=>{
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
