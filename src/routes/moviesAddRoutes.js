const express = require("express");
const router = express.Router();
const path = require("path");

const uploadMiddleware = require("../middleware/multer"); // Import Multer middleware
const movieCtrl = require("../controllers/moviesAddCtrl"); // Controller

//Home page

router.get("/admin",(req,res)=>
{
  res.render("AdminPanel.ejs");
});


  // Route: Render Add Movie Form
  router.get("/add-movie", (req, res) => {
    res.render("AdminPanel.ejs", {
      main_content: "AddMovie"
      
    });
  });
  router.post("/add-movie", uploadMiddleware.single("poster"), movieCtrl.addMovie);



// Route: View All Movies
router.get("/viewmovies", movieCtrl.viewMovies);

// back to view movie page
router.get("/viewMovies", movieCtrl.viewMovies);

//Admin specific movie view
router.get("/view/:mid", movieCtrl.AdminviewMovie);


// Route: Show Edit Movie Form
router.get("/edit/:mid", movieCtrl.editMovieForm);

// ✅ Route: Handle Movie Update with poster upload
router.post("/edit/:mid", uploadMiddleware.single("poster"), movieCtrl.updateMovie);

//delete movie
router.get('/delete/:mid', movieCtrl.deleteMovie);
router.post('/delete/:mid', movieCtrl.deleteMovie);

//Admin panel User data View
router.get('/AdminUserViews', movieCtrl.AdminUserView);

//Admin panel user view specific user info
router.get('/user/view/:uid', movieCtrl.viewUserById);

//Admin panel delete user
router.post('/users/delete/:uid', movieCtrl.deleteUser);


//Admin pamel show Reviews And Ratings
router.get('/ratings', movieCtrl.showRatingsForm);

router.get('/admin/AdminProfileView', movieCtrl.getAdminProfile);
router.get('/AdminProfileUpdate', movieCtrl.getAdminProfileUpdate);
router.post('/AdminProfileUpdate', movieCtrl.postAdminProfileUpdate);


module.exports = router;
