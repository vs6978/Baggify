// routes/index.js
const express = require("express");
const router = express.Router();
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const isloggedin = require("../middlewares/isLoggedIn");

router.get("/", function (req, res){
    let error = req.flash("error");
    let success = req.flash("success");
    res.render("index", { error, loggedin: false });
});

router.get("/shop", isloggedin, async function (req, res){
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop", { products, success });
});
router.get("/cart", isloggedin, async function (req, res){
    let user= await userModel
    .findOne({email:req.user.email})
    .populate("cart");
    const bill=Number(user.cart[0].price)+20-Number(user.cart[0].discount)
    res.render("cart",{user,bill});
});

router.get("/addtocart/:id", isloggedin, async function (req, res){
    const user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.id);
    await user.save();
    req.flash("success", "Added to cart");
    res.redirect("/shop");
});

router.get("/logout", isloggedin, function (req, res){
    req.logout(function(err) {
        if (err) return next(err);
        req.flash("success", "Logged out successfully!");
        res.redirect("/");
    });
});

module.exports = router;
