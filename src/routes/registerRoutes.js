const express = require("express");
const router = express.Router();
const regCtrl = require("../controllers/auth.controller");

router.get("/register", regCtrl.showRegisterForm);
router.post("/register", regCtrl.registerUser);

router.get("/login", regCtrl.showLoginForm);
router.post("/login", regCtrl.loginUser);

module.exports = router;
