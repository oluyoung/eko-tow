const express = require('express');
const router = express.Router();

const driversController = require('../../../controllers/drivers.controller').controller;
const driversControllerObj = new driversController();

router.get('/', driversControllerObj.getMe);
router.put('/', driversControllerObj.updateMe);

module.exports = router;
