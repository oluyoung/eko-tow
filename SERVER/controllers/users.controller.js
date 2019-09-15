const Error = require('../utils/errors').Errors;
const errorObj = new Error();

const userHelper = require('../helpers/users.helper');
const oauthHelper = require('../helpers/oauth.helper');

function UserController() {}

UserController.prototype.createUser = async (req, res, next) => {
  try {
    const user = await userHelper.createUserAsync(req.body);
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
    const user = await userHelper.loginUserAsync(req.body);

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

UserController.prototype.getMe = async (req, res, next) => {
  try {
    const decodedToken = req.decode;
    const user = await userHelper.getUserAsync({ _id: decodedToken.id });

    if (!user) {
      return next(errorObj.NotFound());
    }

    res.json({
      user
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  controller: UserController
};
