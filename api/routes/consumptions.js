var express = require('express');
var router = express.Router();
var validateToken = require('../middlewares/jwt');
var consumptionController = require('../controllers/reporting').consumptions;

router.post('/', validateToken, consumptionController);

module.exports = router;
