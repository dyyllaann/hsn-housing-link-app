var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local");
// var crypto = require("crypto");
// var db = require("../db");

passport.use(
	new LocalStrategy((username, password, done) => {
		User.findOne({ username: username }, (err, user) => {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, { message: "Incorrect username" });
			}
			if (user.password !== password) {
				return done(null, false, { message: "Incorrect password" });
			}
			return done(null, user);
		});
	})
);

passport.serializeUser(function (user, cb) {
	process.nextTick(function () {
		cb(null, { id: user.id, username: user.username });
	});
});

passport.deserializeUser(function (user, cb) {
	process.nextTick(function () {
		return cb(null, user);
	});
});

// GET login page.
router.get("/login", function (req, res, next) {
	res.render("login");
});

// POST login page.
router.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/error",
	})
);

module.exports = router;
