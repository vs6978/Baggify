const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function (req, res) {
    try {
        let { email, fullname, password } = req.body;

        let user = await userModel.findOne({ email: email });
        if (user) {
            req.flash("error", "You already have an account. Please login."); // Using flash
            return res.redirect("/"); // Redirect to homepage
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        let newUser = await userModel.create({
            email,
            password: hash,
            fullname
        });

        let token = generateToken(newUser);
        res.cookie("token", token);
        req.flash("success", "Registration successful! Welcome to the shop.");
        res.redirect("/shop");

    } catch (err) {
        req.flash("error", err.message || "An error occurred during registration."); // Using flash
        res.redirect("/"); // Redirect to homepage
    }
};

module.exports.loginUser = async function (req, res) {
    try {
        let { email, password } = req.body;

        let user = await userModel.findOne({ email: email });
        if (!user) {
            req.flash("error", "Email or password is incorrect."); // Using flash
            return res.redirect("/"); // Redirect to homepage
        }

        const result = await bcrypt.compare(password, user.password);

        if (result) {
            let token = generateToken(user);
            res.cookie("token", token);
            req.flash("success", "Login successful! Enjoy shopping.");
            res.redirect("/shop");
        } else {
            req.flash("error", "Email or password is incorrect."); // Using flash
            return res.redirect("/"); // Redirect to homepage
        }
    } catch (err) {
        req.flash("error", err.message || "An error occurred during login."); // Using flash
        res.redirect("/"); // Redirect to homepage
    }
};