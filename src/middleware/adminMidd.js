exports.isAdmin = (req, res, next) => {
  if (req.session && req.session.role === "admin") {
    return next();
  }
  return res.redirect("/login");
};
