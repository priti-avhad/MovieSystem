const jwt = require("jsonwebtoken");
let storedName = "";
let storedPassword = "";

const SECRET_KEY = "mysecretkey123";

exports.showRegisterForm = (req, res) => {
  res.render("register"); 
};

exports.registerUser = (req, res) => {
  const { name, password } = req.body;
  storedName = name;
  storedPassword = password;
  res.redirect("/login");
};

exports.showLoginForm = (req, res) => {
  res.render("login");
};

exports.loginUser = (req, res) => {
  const { name, password, role } = req.body;

  if (name === storedName && password === storedPassword && role === storedRole) {
    const token = jwt.sign({ name, role }, SECRET_KEY, { expiresIn: "1h" });

    if (role === "Admin") {
      res.render("adminpanel", { name }); // ✅ render admin panel
    } else {
      res.render("userpanel", { name }); // ✅ render user panel
    }
  } else {
    res.render("login", {
      activeTab: "login",
      message: "Invalid name, password, or role.",
    });
  }
};
