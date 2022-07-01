var express = require('express');
var router = express.Router();

const applicant_controller = require('../controllers/applicantController');

// GET home page.
router.get("/", applicant_controller.applicants_list);

module.exports = router;
