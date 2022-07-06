var express = require('express');
var router = express.Router();

const login_controller = require('../controllers/loginController');

// GET home page.
router.get("/login", login_controller.login);

module.exports = router;
