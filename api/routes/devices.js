var express = require('express');
var router = express.Router();
var validateToken = require('../middlewares/jwt');
var devicesController = require('../controllers/reporting').devices;

router.post('/', validateToken, devicesController);

module.exports = router;
