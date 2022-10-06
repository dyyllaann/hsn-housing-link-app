var express = require('express');
var router = express.Router();
// var User = require("../models/user.js");

/* Controllers */
// const applicant_controller = require('./controllers/applicantController');
const dashboard_controller = require('../controllers/dashboardController');

/* Auth dependencies */
// const session = require("express-session");
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;

/* Passport Config */
// passport.use(
// 	new LocalStrategy((username, password, done) => {
// 		User.findOne({ username: username }, (err, user) => {
// 			if (err) {
// 				return done(err);
// 			}
// 			if (!user) {
// 				return done(null, false, { message: "Incorrect username" });
// 			}
// 			if (user.password !== password) {
// 				return done(null, false, { message: "Incorrect password" });
// 			}
// 			return done(null, user);
// 		});
// 	})
// );

// passport.serializeUser(function (user, done) {
// 	done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
// 	User.findById(id, function (err, user) {
// 		done(err, user);
// 	});
// });

const applicant_controller = require('../controllers/applicantController');
// const login_controller = require('../controllers/loginController');

// GET home page.
// router.get("/", applicant_controller.applicants_list);

// // GET login page.
// router.get("/login", (req, res) => {
// 	res.render("login");
// });

// POST login page.
// router.post(
// 	"/login",
// 	passport.authenticate("local", {
// 		successRedirect: "/",
// 		failureRedirect: "/login",
// 	})
// );

// GET error page.
router.get("/error", (req, res) => res.render("error"));

// GET edit page.
router.get("/edit", dashboard_controller.applicant_edit_get);

// POST edit page.
router.post("/edit_post", dashboard_controller.applicant_edit_post);

module.exports = router;
