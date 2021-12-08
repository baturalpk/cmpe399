var express = require('express');
var router = express.Router();
var registerController = require('../controllers/onboarding').register;

router.post('/', registerController);

module.exports = router;
