const Error = require('../utils/errors').Errors;
const errorObj = new Error();
const DriversLocation = require('../models/driversLocations');

function DriversLocationsController() {}

DriversLocationsController.prototype.getNearbyDriversLocations = async (req, res, next) => {
  try {
    // DriversLocation.ensureIndex({'coordinate', '2dsphere'});
    // const driversLocations = await DriversLocation.find({
    //   'coordinate': {
    //     '$near': {
    //       '$geometry': {
    //         'type': 'Point',
    //         'coordinates': [parseFloat(req.body.longitude), parseFloat(req.body.latitude)]
    //       },
    //       '$maxDistance': 10000
    //     }
    //   }
    // });

    const driversLocations = await DriversLocation.find();
    console.log('----\n', driversLocations)
    if (!driversLocations || driversLocations.length > 0) {
      return res.status(404).json({
        error: true,
        message: 'No locations found'
      })
    }

    return res.status(200).json({
      driversLocations
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

DriversLocationsController.prototype.createDriversLocationObj = async (req, res, next) => {
  try {
    const query = {
      driverId: req.params.driverId,
      coordinate: [
        req.body.longitude,
        req.body.latitude
      ],
      socketId: req.body.socketId
    };
    const newDriversLocation = await DriversLocation.create(query);
    console.log("-----\n", newDriversLocation)
    if (!newDriversLocation) {
      return res.status(500);
    }

    return res.status(200).json({
      driverLocation: newDriversLocation
    });
  } catch (error) {
    next(error);
  }
};

DriversLocationsController.prototype.updateDriversLocation = async (req, res, next) => {
  try {
    const query = {
      driverId: req.params.driverId,
      socketId: req.body.socketId
    };
    const updateObj = {
      driverId: req.params.driverId,
      coordinate: {
        type: "Point",
        coordinates: {
          latitude: req.body.latitude,
          longitude: req.body.longitude
        }
      },
      socketId: req.body.socketId
    };
    const options = {new: true};
    const newDriversLocations = await DriversLocation.findOneAndUpdate(query, updateObj, options);

    if (!newDriversLocation) {
      return res.status(500);
    }

    return res.status(200);
  } catch (error) {
    next(error);
  }
};

DriversLocationsController.prototype.getDriversLocation = async (req, res, next) => {
  try {
    const driversLocation = await DriversLocation.findOne(req.params.driverId);
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
