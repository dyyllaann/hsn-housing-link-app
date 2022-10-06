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

// Applicant Edit GET
exports.applicant_edit_get = function (req, res, next) {
	async.parallel(
		{
			applicant: function (callback) {
				// console.log(req.query.id);
				Applicant.findById(req.query.id).exec(callback);
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
	// console.log(req);
	console.log(`req.params.id: ${req.params['id']}`);
	Applicant.findByIdAndUpdate(req.params.id, {}, function(err, docs) {
		if (err) {
        console.log(err)
    }
    else {
        console.log("Updated User : ", docs);
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