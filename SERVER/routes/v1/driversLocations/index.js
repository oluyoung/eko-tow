const router = require('express').Router();

const driversLocationsController = require('../../../controllers/driversLocations.controller').controller;
const driversLocationsControllerObj = new driversLocationsController()

router.get('/', driversLocationsControllerObj.getNearbyDriversLocations);
router.post('/:driverId', driversLocationsControllerObj.createDriversLocationObj);
router.put('/:driverId', driversLocationsControllerObj.updateDriversLocation);
router.get('/:driverId', driversLocationsControllerObj.getDriversLocation);

module.exports = router;
