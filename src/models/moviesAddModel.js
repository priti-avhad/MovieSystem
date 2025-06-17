// moviesAddModel.js
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
  const values = [data.title,data.description,data.releasedate,data.genre,data.director, data.language,data.country,data.budget, data.revenue,data.runtime,data.posterurl,
    data.trailerurl,data.movieurl,id];
    conn.query(sql, values, callback);
  };

  //delete movie
exports.deleteMovieById =(mid, callback)=>
{
  const sql = 'DELETE FROM movies WHERE mid = ?';
  conn.query(sql, [mid], callback);
};