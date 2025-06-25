const express = require('express');
const router = express.Router();
const Owner = require('../models/owners-model');
const isloggedin = require("../middlewares/isLoggedIn");

if (process.env.NODE_ENV === "development") {
    router.post("/create", async function (req, res) {
        let owner = await Owner.find();
        if (owner.length > 0) {
            req.flash("error", "You don't have permission to create a new owner (only one allowed in dev mode).");
           
            return res.redirect("/owners/admin"); 
        }

        let {fullname,email,password}=req.body;

        let createdOwner=await Owner.create({fullname,email,password});
        req.flash("success", "Owner created successfully!");
       
        res.redirect("/owners/admin");
    });
}


router.get("/admin", function (req, res) {
    let error = req.flash("error");
    let success = req.flash("success");
    
    res.render("createproducts", { error, success }); 
});


router.get("/your-route-to-render-createproducts", function(req, res){
    let error = req.flash("error");
    let success = req.flash("success");
    res.render("createproducts", { error, success });
});

router.get("/", function (req, res) {
    res.send('hey its working');
});

module.exports = router;