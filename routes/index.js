const express = require("express");
const isloggedin = require("../middlewares/isLoggedIn");
const router = express.Router();
const productModel = require("../models/product-model");

router.get("/", function(req, res){
    let error = req.flash("error");
    let success = req.flash("success");
    res.render("index", { error, success });
});

router.get("/shop", isloggedin, async function(req, res){
    try {
        let products = await productModel.find();
        res.render("shop", { products });
    } catch (error) {
        console.error("Error fetching products for shop:", error);
        req.flash("error", "Could not load products. Please try again later.");
        res.redirect("/");
    }
});

router.get("/logout", isloggedin, function(req, res){
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash("success", "Logged out successfully!");
        res.redirect("/");
    });
});

module.exports = router;