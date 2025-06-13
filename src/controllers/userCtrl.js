const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByEmail, insertUser } = require('../models/userModel');

const showRegisterForm = (req, res) => {
  res.render("login", { message: null, activeTab: "register" });
};

const showLoginForm = (req, res) => {
  res.render("login", { message: null, activeTab: "login" });
};

const registerUser = (req, res) => {
  const { username, email, password } = req.body;

  findUserByEmail(email, (err, result) => {
    if (err) {
      return res.render("login", { message: "Database error", activeTab: "register" });
    }

    if (result.length > 0) {
      return res.render("login", { message: "User already registered. Please login.", activeTab: "register" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    insertUser({ username, email, password: hashedPassword }, (err) => {
      if (err) {
        return res.render("login", { message: "Error saving user.", activeTab: "register" });
      }

      return res.render("login", { message: "Registration successful. Please log in.", activeTab: "login" });
    });
  });
};

const loginUser = (req, res) => {
  const { email, password, role } = req.body;

  findUserByEmail(email, (err, result) => {
    if (err) {
      return res.render("login", { message: "Database error", activeTab: "login" });
    }

    if (result.length === 0) {
      return res.render("login", { message: "User not registered. Please register.", activeTab: "login" });
    }

    const user = result[0];
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.render("login", { message: "Invalid credentials.", activeTab: "login" });
    }

    const token = jwt.sign({ email, role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Redirect based on role
    if (role === "Admin") {
const selectedView = req.query.view || "dashboard";
res.render("AdminPanel", { view: selectedView });    } else if (role === "User") {
      return res.render("UserPanel", { name: user.username });  // Create UserPanel.ejs
    } else {
      return res.render("login", { message: "Invalid role selected.", activeTab: "login" });
    }
  });
};


module.exports = {
  registerUser,
  loginUser,
  showRegisterForm,
  showLoginForm
};

// hello