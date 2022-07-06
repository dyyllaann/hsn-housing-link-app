var express = require('express');
var router = express.Router();

const applicant_controller = require('../controllers/applicantController');
const login_controller = require('../controllers/loginController');

// GET home page.
router.get("/", applicant_controller.applicants_list);

// GET login page.
router.get("/login", login_controller.login);

module.exports = router;
