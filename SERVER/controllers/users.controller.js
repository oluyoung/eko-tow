const User = require('../models/user');
const Error = require('../utils/errors').Errors;
const errorObj = new Error();

const userHelper = require('../helpers/users.helper');
const oauthHelper = require('../helpers/oauth.helper');

const defaultFields = '_id firstName lastName profilePhoto receive_email_notifications email created_at updated_at';

function UserController() {}

UserController.prototype.createUser = async (req, res, next) => {
  try {
    // change to req.query later
    const user = await userHelper.createUserAsync(req.body, User);
    const token = oauthHelper.generateToken({ id: user.id });
    return res.json({
      oauth: token,
      user
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

UserController.prototype.loginUser = async (req, res, next) => {
  try {
    // change to req.query
    const user = await userHelper.loginUserAsync(req.body, User);
    const token = oauthHelper.generateToken({ id: user.id });
    return res.json({
      oauth: token,
      user
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

UserController.prototype.updateMe = async (req, res, next) => {
  try {
    const decodedToken = req.decode;
    const user = await userHelper.updateUserAsync({_id: decodedToken.id}, req.query, User);

    if (!user) {
      return next(errorObj.NotFound());
    }
    res.json({user});
  } catch (error) {
    console.log(error);
    next(error);
  }
}

UserController.prototype.getMe = async (req, res, next) => {
  try {
    const decodedToken = req.decode;
    const user = await userHelper.getUserAsync({ _id: decodedToken.id }, defaultFields, User);

    if (!user) {
      return next(errorObj.NotFound());
    }
    return res.json({user});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  controller: UserController
};
