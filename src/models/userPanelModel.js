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

// update specific user
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

// Delete watch history by ID
exports.deleteHistoryById = (historyId) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM watchlist WHERE wid = ?";
    db.query(sql, [historyId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

//delete all  watch history

exports.clearAllHistory = (callback) => {
  const query = "DELETE FROM watchlist";

  db.query(query, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};



// recommendRoutes

exports.saveRecommendation = (uid, mid, callback) => {
  const sql = "INSERT IGNORE INTO recommendations (uid, mid) VALUES (?, ?)";
  db.query(sql, [uid, mid], (err, result) => {
    if (err) {
      console.error(" Error inserting into recommendations:", err);
      return callback(err);
    }

    if (result.affectedRows > 0) {
      console.log(` Recommendation saved: uid=${uid}, mid=${mid}`);
    } else {
      console.log(` Recommendation already exists or ignored: uid=${uid}, mid=${mid}`);
    }

    callback(null, result);
  });
};


exports.getAll = (callback) => {
  db.query("SELECT mid, title, genre, posterurl, movieurl FROM movies", callback);
};

exports.getWatched = (uid, callback) => {
  db.query("SELECT mid FROM watchlist WHERE uid = ?", [uid], callback);
};
