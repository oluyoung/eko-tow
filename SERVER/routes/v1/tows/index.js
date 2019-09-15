const router = require('express').Router();

const towsController = require('../../../controllers/tows.controller').controller;
const towControllerObj = new towsController();

router.post('/', towControllerObj.createTow);
// router.put('/tows/:userId/:towId', towControllerObj.updateTow);
// router.get('/tows/:userOrDriverId', towControllerObj.getTows);
// router.get('/tows/:userOrDriverId/:towId', towControllerObj.getTow);

module.exports = router;
