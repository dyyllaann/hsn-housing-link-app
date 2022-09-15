var Applicant = require("../models/applicant");
var async = require("async");

// Display list of all applicants.
exports.applicants_list = function (req, res) {
	Applicant.find({}, "_id name firstName lastName tenants pets_string vehicles seeking preferred_location bedrooms price interests story status")
		.sort({date : -1})
		.exec(function (err, list_applicants) {
			if (err) { return next(err); }
			res.render('admin_dashboard', { title: 'Admin Dashboard', applicants_list: list_applicants, user: req.user });
		}); 
};

// Update applicant entry
// exports.applicant_update = function (req, res) {

// }

// // Display list of all pending applicants.
// exports.applicants_list = function (req, res) {
// 	Applicant.find({ status: pending }, "name tenants pets_string vehicles seeking preferred_location bedrooms price interests story")
// 		.sort({date : -1})
// 		.exec(function (err, applicants) {
// 			if (err) { return next(err); }
// 			res.render('admin_dashboard', { pending_applicants_list: applicants, user: req.user });
// 		}); 
// };