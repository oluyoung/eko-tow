const router = require('express').Router();

const towBookingsController = require('../../../controllers/towBookings.controller').controller;
const towBookingsControllerObj = new towBookingsController();

router.post('/', towBookingsControllerObj.createTowBooking);
router.post('/requestDrivers', towBookingsControllerObj.requestDrivers);
// router.put('/tows/:userId/:towId', towBookingsControllerObj.updateTowBooking);
// router.put('/tows/:userId/:towId', towBookingsControllerObj.updateTowBookingStatus);
// router.put('/tows/:userId/:towId', towBookingsControllerObj.completeTowBooking);
// router.get('/tows/:userOrDriverId', towBookingsControllerObj.getUsersTowBookings);
// router.get('/tows/:userOrDriverId/:towId', towBookingsControllerObj.getUsersTowBooking);

module.exports = router;
