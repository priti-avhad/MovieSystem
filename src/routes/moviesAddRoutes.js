const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const movieCtrl = require("../controllers/moviesAddCtrl");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/images"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.post("/add-movie", upload.single("poster"), movieCtrl.addMove);

module.exports = router;