var express = require('express');
var router = express.Router();
var loginController = require('../controllers/onboarding').login;

router.post('/', loginController);

module.exports = router;
