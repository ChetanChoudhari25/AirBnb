const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const { signUp, login, signUpForm, loginForm, logout } = require("../controllers/users.js");

router.route("/signup")
    .get(signUpForm)
    .post(wrapAsync(signUp));

router.route("/login")
    .get(loginForm)
    .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), login);

router.get("/logout", logout);

module.exports = router;