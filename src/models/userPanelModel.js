

//get view all movies

const db = require('../config/db'); 

exports.getAllMovies = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM movies', (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};


//reating and Review Movies

exports.insertRating = (uid, mid, rating, review, callback) => {
  const sql = `insert into ratings (uid, mid, rating, review, created_at, updated_at) values (?, ?, ?, ?, NOW(), NOW())`;
  db.query(sql, [uid, mid, rating, review], callback);
};

exports.getAllRatings = (callback) => {
  const sql = `
    select r.*, u.uname, m.title 
    from rating r 
    join user u on r.uid = u.uid 
    join movies m on r.mid = m.mid 
    order by r.created_at DESC
  `;
  db.query(sql, callback);
};
