const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByEmail, insertUser } = require("../models/userModel");

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
      return res.render("login", {
        message: "Database error",
        activeTab: "register",
      });
    }

    if (result.length > 0) {
      return res.render("login", {
        message: "User already registered. Please login.",
        activeTab: "register",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    insertUser({ username, email, password: hashedPassword }, (err) => {
      if (err) {
        return res.render("login", {
          message: "Error saving user.",
          activeTab: "register",
        });
      }

      return res.render("login", {
        message: "Registration successful. Please log in.",
        activeTab: "login",
      });
    });
  });
};

const loginUser = (req, res) => {
  const { email, password, role } = req.body;
  console.log("1  ", email, password, role);

  findUserByEmail(email, (err, result) => {
    if (err) {
      return res.render("login", {
        message: "Database error",
        activeTab: "login",
      });
    }

    if (result.length === 0) {
      return res.render("login", {
        message: "User not registered. Please register.",
        activeTab: "login",
      });
    }
    console.log("2  User is log in ", result);

    const user = result[0];
    console.log("2a  User is log in ", user);
    
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.render("login", {
        message: "Invalid credentials.",
        activeTab: "login",
      });
    }

// Assuming you get user from DB and it has user.uid

const token = jwt.sign(
  {
    id: user.uid,            
    email: user.email,
    role: user.role
  },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

    console.log("3  Token for user ", token);
    res.cookie("token", token, { httpOnly: true });

    // Redirect based on role
    if (role == "User") {
      console.log("41 User role to dashbaord ");

      return res.redirect("/user");
    }
    if (role === "Admin") {
      console.log("4a   Admin role view ");

      const selectedView = req.query.view || "dashboard";
      res.render("AdminPanel", { view: selectedView });
    } else if (role === "User") {
      return res.render("UserPanel", { name: user.username }); // Create UserPanel.ejs
    } else {
      console.log("4b   Else view ");

      return res.render("login", {
        message: "Invalid role selected.",
        activeTab: "login",
      });
    }
  });
};

module.exports = {
  registerUser,
  loginUser,
  showRegisterForm,
  showLoginForm,
};


