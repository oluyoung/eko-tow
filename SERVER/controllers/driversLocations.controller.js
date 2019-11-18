const Error = require('../utils/errors').Errors;
const errorObj = new Error();
const DriversLocation = require('../models/driversLocations');

function DriversLocationsController() {}

DriversLocationsController.prototype.getNearbyDriversLocations = async (req, res, next) => {
  try {
    const points = [parseFloat(req.query.longitude), parseFloat(req.query.latitude)];

    DriversLocation.createIndexes({point: 'coordinate'});
    const nearbyDrivers = await DriversLocation.find({
      coordinate: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: points
          },
          $maxDistance: 1000
          }
        }
      });

    if (!nearbyDrivers) {
      return res.status(404).json({
        error: true,
        message: 'No locations found'
      })
    }

    return res.status(200).json({
      nearbyDrivers
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

DriversLocationsController.prototype.createDriversLocationObj = async (req, res, next) => {
  try {
    // might have to use req.query
    const query = {
      driverId: req.params.driverId,
      coordinate: [
        req.body.longitude,
        req.body.latitude
      ],
      socketId: req.body.socketId
    };
    if (!query.driverId) {
      return next(errorObj.UnprocessableEntity('Driver\'s ID is missing'));
    }
    if (query.coordinate.length < 2) {
      return next(errorObj.UnprocessableEntity('Latitude or longitude is missing'));
    }
    const newDriversLocation = await DriversLocation.create(query);
    if (!newDriversLocation) {
      return res.status(500);
    }

    return res.status(200).json({
      driversLocation: newDriversLocation
    });
  } catch (error) {
    next(error);
  }
};

DriversLocationsController.prototype.updateDriversLocation = async (req, res, next) => {
  try {
    const query = {
      driverId: req.params.driverId
    };
    const updateObj = {
      coordinate: [
        req.body.longitude,
        req.body.latitude
      ],
      socketId: req.body.socketId
    };
    const options = {new: true, upsert: true, setDefaultsOnInsert: true};
    const newDriversLocation = await DriversLocation.findOneAndUpdate(query, updateObj, options);

    if (!newDriversLocation) {
      return res.status(500);
    }

    return res.status(200).json({
      driversLocation: newDriversLocation
    });
  } catch (error) {
    next(error);
  }
};

DriversLocationsController.prototype.getDriversLocation = async (req, res, next) => {
  try {
    const query = {
      driverId: req.params.driverId
    };
    const driversLocation = await DriversLocation.findOne(query);
    if (!driversLocation) {
      return res.status(404);
    }

    return res.status(200).json({
      driversLocation
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  controller: DriversLocationsController
};
