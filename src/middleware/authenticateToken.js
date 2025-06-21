const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token =
    req.cookies.token || req.headers.authorization?.split(" ")[1];
    
if (!token) {
  return res.redirect("/login");
}


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Set no-cache headers to prevent back navigation after logout
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');

    next(); // Proceed to the protected route
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = authenticateToken;
