const session = require("express-session");
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

// exports.loginUser = (req, res) => {
//   const { name, password, role } = req.body;
//   console.log(name,password,role);
  
//   if (name === storedName && password === storedPassword && role === storedRole) {
    
//     const token = jwt.sign({ name, role }, SECRET_KEY, { expiresIn: "1h" });
    
//     // req.session.user = 
//     if (role === "Admin") {
//       res.render("adminpanel", { name }); // ✅ render admin panel
//     } else {
//       res.render("userpanel", { name }); // ✅ render user panel
//     }
//   } else {
//     res.render("login", {
//       activeTab: "login",
//       message: "Invalid name, password, or role.",
//     });
//   }
// };


// exports.loginUser = (req, res) => {
//   const { name, password, role } = req.body;

//   // 🔎 Lookup user from database
//   movieModel.authenticateUser(name, password, role, (err, user) => {
//     if (err || !user) {
//       return res.render("login", {
//         activeTab: "login",
//         message: "Invalid name, password, or role.",
//       });
//     }

//     // ✅ Store dynamic values in session
//     req.session.uid = user.uid;
//     req.session.name = user.name;
//     req.session.role = user.role;

//     const token = jwt.sign({ uid: user.uid, name: user.name, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

//     console.log("✅ Session set:", req.session);

//     if (user.role === "Admin") {
//       res.render("adminpanel", { name: user.name });
//     } else {
//       res.render("userpanel", { name: user.name });
//     }
//   });
// };

exports.loginUser = (req, res) => {
  const { name, password, role } = req.body;

  movieModel.authenticateUser(name, password, role, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        success: false,
        message: "Invalid name, password, or role.",
      });
    }

    // ✅ Store in session (optional)
    req.session.uid = user.uid;
    req.session.name = user.name;
    req.session.role = user.role;

    // ✅ Generate token
    const token = jwt.sign(
      { uid: user.uid, name: user.name, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // ✅ Send everything to frontend
    return res.json({
      success: true,
      token,
      userid: user.uid,
      username: user.name,
      role: user.role
    });
  });
};
