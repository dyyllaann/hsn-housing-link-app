var Applicant = require("../models/applicant");
var Message = require("../models/message");
var async = require("async");

// Display list of all admin data (messages and applicants).
exports.admin_data = function (req, res) {
	async.parallel(
		{
			messages: function (callback) {
				Message.find(
					{},
					"_id applicantEmail date_added name firstName lastName email message status"
				)
					.sort({ date: -1 })
					.exec(callback);
			},
			pendingMessageCount: function (callback) {
				Message.countDocuments({ status: "pending" }).exec(callback);
			},
			approvedMessageCount: function (callback) {
				Message.countDocuments({ status: "approved" }).exec(callback);
			},
			archivedMessageCount: function (callback) {
				Message.countDocuments({ status: "archived" }).exec(callback);
			},
			applicants: function (callback) {
				Applicant.find(
					{},
					"_id date_added email name firstName lastName preferredName tenants pets_string seeking preferred_location bedrooms price interests story status"
				)
					.sort({ date: -1 })
					.exec(callback);
			},
			// applicantEmail: function (callback) {
			// 	Applicant
			// 		.findById(_id, 'email')
			// 		.exec(callback);
			// },
			pendingApplicantCount: function (callback) {
				Applicant.countDocuments({ status: "pending" }).exec(callback);
			},
			approvedApplicantCount: function (callback) {
				Applicant.countDocuments({ status: "approved" }).exec(callback);
			},
			archivedApplicantCount: function (callback) {
				Applicant.countDocuments({ status: "archived" }).exec(callback);
			},
		},
		function (err, admin_data) {
			if (err) {
				return next(err);
			}
			res.render("admin_dashboard", {
				title: "Admin Dashboard",
				admin_data,
				user: req.user,
			});
		}
	);
};