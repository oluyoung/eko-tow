const Error = require('../utils/errors').Errors;
const errorObj = new Error();
const Tow = require('../models/tow');

function TowsController() {}

TowsController.prototype.createTow = async (req, res, next) => {
  try {
    const query = {
      userId: req.query.userId,
      driverId: req.query.driverId,
      pickupLocation: req.query.pickupLocation,
      dropoffLocation: req.query.dropoffLocation,
      fare: req.query.fare
    };
    const newTow = await Tow.create(query);

    if (!newTow) {
      return res.status(500);
    }

    return res.status(200);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  controller: TowsController
};
