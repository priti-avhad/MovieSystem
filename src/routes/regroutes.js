let express = require("express");
let regCtrl = require("../controllers/regctrl");
let conn=require("../config/db")
let router = express.Router();

router.get("/", regCtrl.homePage);



module.exports = router;
