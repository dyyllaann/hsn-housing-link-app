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
					"_id applicantEmail name firstName lastName email message status"
				)
					.sort({ date: -1 })
					.exec(callback);
			},
			pendingMessageCount: function (callback) {
				Message
					.countDocuments({ status: "pending" })
					.exec(callback);
			},
			applicants: function (callback) {
				Applicant.find(
					{},
					"_id email name firstName lastName tenants pets_string seeking preferred_location bedrooms price interests story status"
				)
					.sort({ date: -1 })
					.exec(callback);
			},
			pendingApplicantCount: function (callback) {
				Applicant
					.countDocuments({ status: "pending" })
					.exec(callback);
			},
			approvedApplicantCount: function (callback) {
				Applicant
					.countDocuments({ status: "approved" })
					.exec(callback);
			},
			archivedApplicantCount: function (callback) {
				Applicant
					.countDocuments({ status: "archived" })
					.exec(callback);
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

// Applicant Edit GET
exports.applicant_edit_get = function (req, res, next) {
	async.parallel(
		{
			applicant: function (callback) {
				Applicant.findById(req.params.id).exec(callback);
			},
		},
		function (err, results) {
			if (err) {
				return next(err);
			}
			res.render("applicant_form", {
				title: "Applicant Form",
				applicant: results.applicant,
			});
		}
	);
}

// Applicant Edit POST
exports.applicant_edit_post = function (req, res) {
	Applicant.findByIdAndUpdate(req.params.id, { 
		_id: req.params.id, 
		interests: req.body.interests, 
		story: req.body.story 
	}, function(err, docs) {
		if (err) {
        console.log(err)
    }
    else {
        console.log("Updated User.");
				res.redirect('/admin');
    }
	})
}

// Applicant approve POST
exports.approve = function (req, res, next) {
	Applicant.findByIdAndUpdate(
		req.body.approve,
		{ status: "approved" },
		function (err, docs) {
			if (err) {
				console.log(err);
			} else {
				console.log("Approved User : ", docs);
			}
			res.redirect("/admin");
		}
	)
};

// Applicant archive POST
exports.archive = function (req, res, next) {
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
exports.restore = function (req, res, next) {
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