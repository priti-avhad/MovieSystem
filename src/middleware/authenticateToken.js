const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // adjust as needed

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log("Token is verifie ", req.user);

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = authenticateToken;

// const jwt = require("jsonwebtoken");

// const authenticateToken = (req, res, next) => {
//   // 🔐 Get token from cookie or Authorization header
//   const authHeader = req.headers.authorization;
//   const tokenFromHeader = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
//   const token = req.cookies.token || tokenFromHeader;

//   if (!token) {
//     return res.status(401).json({ message: "Access denied. No token provided." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // 🟢 Securely verify using secret key
//     req.user = decoded;

//     console.log("✅ Token verified. Payload:", req.user); // { uid, name, role }
//     next(); // ✅ Proceed to next middleware/route
//   } catch (err) {
//     console.error("❌ Invalid token:", err.message);
//     return res.status(401).json({ message: "Invalid or expired token." });
//   }
// };

// module.exports = authenticateToken;
