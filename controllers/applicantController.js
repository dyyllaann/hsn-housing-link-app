var Applicant = require("../models/applicant");
var Message = require("../models/message");
var async = require("async");

// Display list of all applicants.
exports.applicants_list = function (req, res) {
	Applicant.find({}, "status email firstName lastName name preferred_name tenants pets_string seeking preferred_location bedrooms price interests story")
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
		preferred_name: req.body.preferredName,
		email: req.body.email,
		date_added: new Date,
		tenants: req.body.tenants,
		seeking: req.body.seeking,
		preferred_location: req.body.location,
		bedrooms: req.body.tenants,
		price: {"min": req.body.priceRange_min, "max": req.body.priceRange_max},
		// pets: { type: Array }, // Currently using string instead of array or object
		pets_string: req.body.pets,
		occupation_location: req.body.occupationLocation,
		story: req.body.story,
		interests: req.body.interests,
		status: "pending",
	}).save((err) => {
		if (err) {
			return next(err);
		}
		res.render("listing_confirmation");
	});
};

// POST connect.
exports.connect = function (req, res, next) {
	const message = new Message({
		applicantId: req.body.applicantId,
		applicantEmail: req.body.applicantEmail,
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
		// res.redirect("/");
		res.render("message_confirmation");
	});
};

// Applicant archive POST
exports.applicant_archive = function (req, res, next) {
	Applicant.findByIdAndUpdate(
		req.body.archive,
		{ status: "archived" },
		function (err, docs) {
			if (err) {
				console.log(err);
			} else {
				console.log("Archived User : ", docs);
			}
			res.redirect("/admin");
		}
	)
}

// Applicant restore POST
exports.applicant_restore = function (req, res, next) {
	Applicant.findByIdAndUpdate(
		req.body.restore,
		{ status: "approved" },
		function (err, docs) {
			if (err) {
				console.log(err);
			} else {
				console.log("Restored User : ", docs);
			}
			res.redirect("/admin");
		}
	)
};

// Applicant delete POST
exports.applicant_delete = function(req, res, next) {
	Applicant.deleteOne(
		{ _id: req.body.delete },
		function (err, docs) {
			if (err) {
				console.log(err); 
			} else {
				console.log("Deleted Applicant : ", docs);
			}
			res.redirect("/admin");
		}
	)
}