const db = require('../config/db');

const findUserByEmail = (email, callback) => {
  db.query("SELECT * FROM user WHERE email = ?", [email], callback);
};

const insertUser = (user, callback) => {
  db.query("INSERT INTO user (uname, email, password) VALUES (?, ?, ?)", 
    [user.username, user.email, user.password], callback);
};

module.exports = { findUserByEmail, insertUser };
