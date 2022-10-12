var Applicant = require("../models/applicant");
var Message = require("../models/message");
var async = require("async");

// Display list of all applicants.
exports.applicants_list = function (req, res) {
	Applicant.find({}, "status firstName lastName name tenants pets_string vehicles seeking preferred_location bedrooms price interests story")
		.sort({date : -1})
		.exec(function (err, list_applicants) {
			if (err) { return next(err); }
			res.render('applicants_list', { title: 'All Applicants', applicants_list: list_applicants, user: req.user });
		}); 
};

// POST submit-listing page.
exports.submit_listing = function (req, res, next) {
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
};

// POST submit-listing page.
exports.connect = function (req, res, next) {
	const message = new Message({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		date_added: new Date,
		message: req.body.message,
		status: "pending",
	}).save((err) => {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
};