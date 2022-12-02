var express = require('express');
var router = express.Router();

// GET error page.
router.get("/error", (req, res) => res.render("error"));

module.exports = router;
