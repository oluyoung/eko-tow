const Error = require('../utils/errors').Errors;
const errorObj = new Error();
const Driver = require('../models/driver');
const driverHelper = require('../helpers/users.helper');
const oauthHelper = require('../helpers/oauth.helper');

const defaultFields = '_id firstName lastName profilePhoto receive_email_notifications rating trucks email created_at updated_at';

function DriverController() {}

DriverController.prototype.createDriver = async (req, res, next) => {
  try {
    const driver = await driverHelper.createUserAsync(req.body, Driver);
    const token = oauthHelper.generateToken({ id: driver.id });
    return res.json({
      oauth: token,
      driver
    });
  } catch (error) {
    next(error);
  }
}

DriverController.prototype.loginDriver = async (req, res, next) => {
  try {
    const driver = await driverHelper.loginUserAsync(req.body, Driver);

    const token = oauthHelper.generateToken({ id: driver.id });
    return res.json({
      oauth: token,
      driver
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

DriverController.prototype.updateMe = async (req, res, next) => {
  try {
    const decodedToken = req.decode;
    const driver = await driverHelper.updateUserAsync({_id: decodedToken.id}, req.query, Driver);

    if (!driver) {
      return next(errorObj.NotFound());
    }
    res.json({driver});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

DriverController.prototype.getMe = async (req, res, next) => {
  try {
    const decodedToken = req.decode;
    const driver = await driverHelper.getUserAsync({ _id: decodedToken.id }, defaultFields, Driver);

    if (!driver) {
      return next(errorObj.NotFound());
    }

    res.json({driver});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  controller: DriverController
};
