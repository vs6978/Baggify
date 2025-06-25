const express = require('express');
const router = express.Router();
const {registerUser, loginUser}=require("../controllers/authControllers");

router.get("/", function (req, res) {
    res.send('hey its working');
});
router.post("/register",registerUser);
router.post("/login",loginUser);

router.get("/logout", function(req, res) {
    res.clearCookie("token"); 
    req.flash("success", "You have been logged out."); 
    res.redirect("/"); 
});


module.exports = router;