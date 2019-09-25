const router = require('express').Router();

const driversController = require('../../../controllers/drivers.controller').controller;
const driversControllerObj = new driversController();

const { verifyAuth } = require('../../../middlewares');

router.post('/', driversControllerObj.createDriver);
router.get('/', driversControllerObj.loginDriver);
// router.use(verifyAuth());
router.use('/me', require('./me'));

module.exports = router;
