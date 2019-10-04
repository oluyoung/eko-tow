const Error = require('../utils/errors').Errors;
const errorObj = new Error();
const TowBooking = require('../models/towBooking');
const towBookingHelper = require('../helpers/towBookings.helper');

const bookingStatus = {
  pending: 'PENDING',
  accepted: 'ACCEPTED',
  started: 'STARTED',
  cancel: 'CANCEL',
  completed: 'COMPLETED'
}

function TowBookingsController() {}

TowBookingsController.prototype.getTowBooking = async (req, res, next) => {
  try {
    const towBooking = await towBookingHelper.getTowBookingAsync({_id: req.params.id });

    if (!towBooking) {
      return next(errorObj.NotFound());
    }

    res.json({towBooking});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

TowBookingsController.prototype.getTowBookings = async (req, res, next) => {
  try {
    const towBookings = await towBookingHelper.getTowBookingAsync({_id: req.params.id });

    if (!towBookings) {
      return next(errorObj.NotFound());
    }

    res.json({
      towBookings,
      count: towBookings.length
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// user gets nearby drivers
// user makes request
// request sent to all nearby drivers
// one driver accepts
// request sent to all other drivers that it is confirmed
// request sent to user that driver is coming

TowBookingsController.prototype.requestDrivers = (req, res, next) => {
  console.log(req.body)
  if (!req.body.nearbyDrivers || !req.body.towBooking) {
    return next(errorObj.UnprocessableEntity('nearbyDrivers is empty'));
  }
  const io = req.app.io;
  // don't send the whole object only send what you need, USE A TRANSFORMER
  io.emit('towRequest', {
    drivers: req.body.nearbyDrivers,
    towBooking: req.body.towBooking // transformTowRequestTowBooking(r.b.tB)
  });

  return res.status(200).json({
    success: true
  });
}

TowBookingsController.prototype.setAcceptedDriver = (req, res, next) => {
  // get towBookingId, driverId
  // update booking status with driverId, to accepted
  // emit towBookingId & driverId
  // remove towBooking using the id from  all drivers
  const driver = Driver.findById({_id: acceptedDriver})
  if (!driver) {
    return next(errorObj.NotFound());
  }

  const io = req.app.io;
  io.emit('acceptedTowRequest', {
    driver, // transformAcceptedTowRequestDriver(r.b.tB)
    towBookingId
  });
  } else {
    console.log(acceptedDriver.driverId + 'is not connected');
  }
}

TowBookingsController.prototype.trackDriver = () => {

}

TowBookingsController.prototype.createTowBooking = async (req, res, next) => {
  try {
    const data = req.body
    for (key in data) {
      if (!data[key]) {
        return next(errorObj.UnprocessableEntity(key + ' is missing'));
      }
    }

    const newTowBooking = new TowBooking({...data});
    await newTowBooking.save();

    if (!newTowBooking) {
      return res.status(500);
    }

    return res.status(200).json({
      success: true,
      towBooking: newTowBooking
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

TowBookingsController.prototype.updateTowBooking = async (req, res, next) => {
  try {
    const options = { new: true };
    const newTowBooking = await TowBooking.findByIdAndUpdate(req.body.data, req.body.update, options);

    if (!newTowBooking) {
      return next(errorObj.NotFound());
    }

    return res.status(200).json({
      success: true,
      towBooking: newTowBooking
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

TowBookingsController.prototype.updateTowBookingStatus = async (req, res, next) => {
  try {
    const options = { new: true };
    const newTowBooking = await TowBooking.findByIdAndUpdate(req.body.data, {status: req.body.status}, options);

    if (!newTowBooking) {
      return next(errorObj.NotFound());
    }

    return res.status(200).json({
      success: true,
      towBooking: newTowBooking
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = {
  controller: TowBookingsController
};
