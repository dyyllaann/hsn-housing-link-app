var User = require("../models/user");
var async = require("async");
// validator = require("express-validator");
// body = validator.body();
// validationResult = validator.validationResult();
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;

exports.login = function (req, res) {
	res.render("login", {
		title: "Account"
	})
};

exports.create_account = function (req, res) {
	res.render("layout", {
		title: "Create Account",
		message: "Account creation is not currently active. If you have admin credentials, please use those."
	})
}

exports.info = function (req, res) {
	res.render("info", {
		title: "Login Info"
	});
};

// GET login page.
exports.login_get = function (req, res) {
	res.render("login");
};

// GET logout page.
exports.logout = function (req, res) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
};

// // POST login page.
// exports.login_post = function (req, res, next) {
// 	passport.authenticate("local", {
// 		successRedirect: "/admin",
// 		failureRedirect: "/login",
// 	})
// 	next();
// };