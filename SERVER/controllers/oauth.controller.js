const User = require('../models/user');

const oauthHelper = require('../helpers/oauth.helper');

const validator = require('validator');

const Errors = require('../utils/errors').Errors;
const errorObj = new Errors();

function Oauth() {}

Oauth.prototype.oauth = async (req, res, next) => {
    const { email, password, user_type } = req.body;

    if (!email)
        return next(errorObj.UnprocessableEntity('Email missing'));

    if (!validator.isEmail(email))
        return next(errorObj.UnprocessableEntity('Invalid Email'));

    if (!password)
        return next(errorObj.UnprocessableEntity('Password missing'));

    try {
        const user = await User.findOne({ email }, 'created_at email family_name given_name password profile_picture');

        if (user) {
            const verified = await user.verifyPasswordAsync(password);

            if (verified) {
                const token = oauthHelper.generateToken({ id: user.id });

                const userToJSON = user.toObject();
                delete userToJSON['password'];

                return res.json({ oauth: token, user: userToJSON });
            } else {
                return next(errorObj.Unauthorized('Invalid credentials'));
            }
        } else {
            return next(errorObj.Unauthorized('Invalid credentials'));
        }
    } catch(e) {
        return next(e);
    }
};

module.exports = {
    controller: Oauth
};
