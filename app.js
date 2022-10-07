/* Standard dependencies */
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

/* Auth dependencies */
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

/* Unused dependencies */
// var createError = require('http-errors');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var compression = require('compression');
// var helmet = require('helmet');

/* Models */
var User = require("./models/user.js");
const Applicant = require('./models/applicant');

/* Controllers */
const applicant_controller = require('./controllers/applicantController');
const dashboard_controller = require('./controllers/dashboardController');
const login_controller = require('./controllers/loginController');

/* Routers */
var indexRouter = require('./routes/index');

/* Mongoose connection */
var mongoDB =
  "mongodb+srv://admin:hsn-admin@cluster0.qnb2t.mongodb.net/housing_link?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/* Passport Config */
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

/* Session support */
passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

var app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);

app.use(express.json());

/* Set user (must be before view engine) */
app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

/* View engine */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// GET index page.
app.get("/", applicant_controller.applicants_list);

/* Auth Routes */
app.get("/login", login_controller.login_get);
app.get("/logout", login_controller.logout);
app.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/admin",
		failureRedirect: "/login",
	})
);

// POST submit-listing page.
app.post("/submit-listing", (req, res, next) => {
	const applicant = new Applicant({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		date_added: new Date,
		tenants: req.body.tenants,
		seeking: req.body.seeking,
		preferred_location: req.body.location,
		bedrooms: req.body.tenants,
		price: {"min": req.body.priceRange_min, "max": req.body.priceRange_max},
		// pets: { type: Array }, // Currently using string instead of array or object
		pets_string: req.body.pets,
		vehicles: req.body.vehicles,
		occupation_location: req.body.occupationLocation,
		story: req.body.story,
		interests: req.body.interests,
		status: "pending",
	}).save((err) => {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
});

/* Admin Routes */
app.get("/admin", dashboard_controller.applicants_list);
app.post("/approve", dashboard_controller.approve);
app.post("/archive", dashboard_controller.archive);
app.post("/restore", dashboard_controller.restore);
// app.get("/edit/", dashboard_controller.applicant_edit_get);
// app.post("/edit_post", dashboard_controller.applicant_edit_post);

module.exports = app;
