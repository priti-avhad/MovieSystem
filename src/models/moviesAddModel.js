// src/models/moviesAddModel.js
const conn = require("../config/db.js");

// Now taking a single data object and callback\,exports.insertMovie = (data, callback) => {


exports.insertMovie = (data, callback) => {
  const {
    title,
    description,
    releasedate,
    genre,
    director,
    language,
    country,
    budget,
    revenue,
    runtime,
    posterurl,
    trailerurl,
    movieurl
  } = data;

  const sql = `
    INSERT INTO movies (
      title,
      description,
      releasedate,
      genre,
      director,
      language,
      country,
      budget,
      revenue,
      runtime,
      posterurl,
      trailerurl,
      movieurl
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    title,
    description,
    releasedate,
    genre,
    director,
    language,
    country,
    budget,
    revenue,
    runtime,
    posterurl,
    trailerurl,
    movieurl
  ];

  conn.query(sql, values, (err, result) => {
    if (typeof callback === 'function') {
      callback(err, result);
    } else {
      console.error("❌ insertMovie called without a valid callback!");
    }
  });
};

  
//Get All Movies
exports.getAllMovies = (callback) =>{
  let query = "select * from movies";
  conn.query(query,[],(err,result) =>{
    if(err){
      return callback(err,null);
    }
    return callback(null, result);
  })
}

// Get Movie by Id
exports.getMovieById = (id,callback)=>{
  let query= 'select * from movies where mid = ?';
  conn.query(query,[id],(err,result) =>{
    if(err){
      return callback(err,null);
    }
    return callback(null,result);
  });
};

//show specific all data
exports.getAllData = (id, callback) => {
  const query = `SELECT * FROM movies WHERE mid = ?`;
  conn.query(query, [id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

// Update movie by ID
exports.updateMovie = (id, data, callback) => {
  const sql = `
    UPDATE movies
    SET 
      title = ?, description = ?, releasedate = ?, genre = ?, director = ?, 
      language = ?, country = ?, budget = ?, revenue = ?, runtime = ?, 
      posterurl = ?, trailerurl = ?, movieurl = ?, updated_at = NOW()
    WHERE mid = ?
  `;

  const values = [
    data.title, data.description, data.releasedate, data.genre, data.director,
    data.language, data.country, data.budget, data.revenue, data.runtime,
    data.posterurl, data.trailerurl, data.movieurl, id
  ];

  conn.query(sql, values, callback); // ✅ Execute the query
};


  //delete movie
exports.deleteMovieById =(mid, callback)=>
{
  const sql = 'DELETE FROM movies WHERE mid = ?';
  conn.query(sql, [mid], callback);
};


//Admin panel user view 
exports.getUserById = (uid, callback) => {
  const sql = 'SELECT * FROM user WHERE uid = ?';
  conn.query(sql, [uid], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result[0]);
  });
};


//Admin panel delete user
exports.deleteUserById = (id, callback) => {
  const sql = 'DELETE FROM user WHERE uid = ?';
  conn.query(sql, [id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

//Admin panel view user ratings

exports.getAllRatings = (callback) => {
  const sql = `SELECT r.rid, r.uid, u.uname AS username, r.mid, m.title AS movie_name,r.rating, r.review, r.created_at
    FROM rating r JOIN user u ON r.uid = u.uid  JOIN movies m ON r.mid = m.mid ORDER BY r.created_at DESC `;
  
  conn.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};


const Admin = {
  // Find admin by email (for login)
  findByEmail: (email, callback) => {
    const sql = 'SELECT * FROM user WHERE email = ?';
    db.query(sql, [email], callback);
  },

  // Find admin by ID
  findById: (uid, callback) => {
    const sql = 'SELECT * FROM user WHERE uid = ?';
    db.query(sql, [uid], callback);
  },
  getAll: (callback) => {
    const sql = 'SELECT * FROM user';
    db.query(sql, callback);
  }
};

//update admin profile
exports.getAdminProfileUpdate = (req, res) => {
  const admin = req.session.admin;
  if (!admin) return res.redirect('/login');

  res.render('AdminProfileUpdate', { admin });
};

// POST: Handle Update Submission
// Update Admin Profile
exports.updateProfile = (uid, uname, email, callback) => {
  const sql = 'UPDATE user SET uname = ?, email = ?, updated_at = NOW() WHERE uid = ?';
  conn.query(sql, [uname, email, uid], callback);
};

