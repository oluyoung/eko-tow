const router = require('express').Router();

const towBookingsController = require('../../../controllers/towBookings.controller').controller;
const towBookingsControllerObj = new towBookingsController();

router.post('/', towBookingsControllerObj.createTowBooking);
router.post('/requestDrivers', towBookingsControllerObj.requestDrivers);
// router.put('/tows/:towId', towBookingsControllerObj.updateTowBooking);
// router.put('/tows/:towId', towBookingsControllerObj.updateTowBookingStatus);
router.get('/tows/:userOrDriver/:userOrDriverId', towBookingsControllerObj.getTowBookings);
router.get('/tows/:userOrDriver/:userOrDriverId/:towId', towBookingsControllerObj.getTowBooking);
router.post('/setAcceptedDriver', towBookingsControllerObj.setAcceptedDriver)

module.exports = router;
