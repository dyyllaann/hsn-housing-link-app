var Applicant = require("../models/applicant");
var Message = require("../models/message");
var async = require("async");

// Display list of all admin data (messages and applicants).
exports.message_data = function (req, res) {
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
		},
		function (err, message_data) {
			if (err) {
				return next(err);
			}
			res.render("admin_dashboard", {
				// title: "Admin Dashboard",
				message_data,
				user: req.user,
			});
		}
	);
};

// Message approve POST
exports.message_approve = function (req, res, next) {
	Message.findByIdAndUpdate(
		req.body.messageApprove,
		{ status: "approved" },
		function (err, docs) {
			if (err) {
				console.log(err);
			} else {
				console.log("Approved Message : ", docs);
			}
			res.redirect("/admin");
		}
	)
};

// Message restore POST
exports.message_restore = function (req, res, next) {
	Message.findByIdAndUpdate(
		req.body.restore,
		{ status: "approved" },
		function (err, docs) {
			if (err) {
				console.log(err);
			} else {
				console.log("Restored Message : ", docs);
			}
			res.redirect("/admin");
		}
	)
};

// Message archive POST
exports.message_archive = function (req, res, next) {
	Message.findByIdAndUpdate(
		req.body.archive,
		{ status: "archived" },
		function (err, docs) {
			if (err) {
				console.log(err);
			} else {
				console.log("Archived Message : ", docs);
			}
			res.redirect("/admin");
		}
	)
}

// Message delete POST
exports.message_delete = function(req, res, next) {
	Message.deleteOne(
		{ _id: req.body.delete },
		function (err, docs) {
			if (err) {
				console.log(err); 
			} else {
				console.log("Deleted Message : ", docs);
			}
			res.redirect("/admin");
		}
	)
}