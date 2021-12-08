var express = require('express');
var router = express.Router();
var validateToken = require('../middlewares/jwt');
var billsController = require('../controllers/reporting').bills;

router.post('/', validateToken, billsController);

module.exports = router;
