const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/userCtrl");

router.get("/register", authCtrl.showRegisterForm);
router.post("/register", authCtrl.registerUser);

router.get("/login", authCtrl.showLoginForm);
router.post("/login", authCtrl.loginUser);



module.exports = router;
