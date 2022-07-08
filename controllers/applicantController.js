var Applicant = require("../models/applicant");
var async = require("async");

// Display list of all applicants.
exports.applicants_list = function (req, res) {
	Applicant.find({}, "name tenants pets_string vehicles seeking preferred_location bedrooms price interests story")
		.sort({date : -1})
		.exec(function (err, list_applicants) {
			if (err) { return next(err); }
			res.render('applicants_list', { title: 'All Applicants', applicants_list: list_applicants, user: req.user });
		}); 
};