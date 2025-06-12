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
  const { name, password } = req.body;

  if (name === storedName && password === storedPassword) {
    const token = jwt.sign({ name }, SECRET_KEY, { expiresIn: "1h" });

    res.send(`
      <h2 style="color:green;">Login successful!</h2>
      <p>Token: <code>${token}</code></p>
    `);
  } else {
    res.send("<h2 style='color:red;'>Invalid name or password.</h2>");
  }
};


// hello