const User = require('../../models/user');
const { verifyPassword } = require('../../models/user/utils')

const Errors = require('../../utils/errors').Errors;
const errorObj = new Errors();

const oauthHelper = require('../oauth.helper');

const { buildQuery } = require('../_helpers');

const DEFAULT_FIELDS = '_id firstName lastName profilePhoto receive_email_notifications email created_at updated_at';

function throwError(email, password) {
  if (!email) {
    throw errorObj.UnprocessableEntity('Email missing');
  }

  if (!password) {
    throw errorObj.UnprocessableEntity('Password missing');
  }
}

const createUserAsync = async function(data = {}, options = {}) {
    const { email, firstName, lastName, password, dob } = data;

    throwError(email, password);

    const newUser = new User({ email, firstName, lastName, password, dob });

    return await newUser.save();
}

const loginUserAsync = async (data = {}, options = {}) => {
  const { email, password } = data;
  throwError(email, password);

  const user = await User.findOne({email}, 'created_at email firstName lastName password profilePhoto');
  if (!user) {
    throw errorObj.NotFound('Invalid email or password');
  }

  const isPasswordCorrect = await user.verifyPasswordAsync(password);
  if (!isPasswordCorrect) {
    throw errorObj.NotFound('Invalid email or password');
  }

  return user;
};

// †
const getUserAsync = (query, options = {}) => new Promise((resolve, reject) => {
  if (!query || typeof query !== 'object') {
    throw errorObj.UnprocessableEntity('Invalid query');
  }

  options.select = DEFAULT_FIELDS;

  let userQuery = User.findOne(query);

  userQuery = buildQuery(userQuery, options);

  userQuery.exec((err, user) => {
    if (err) {
      console.error(err);
      return reject(errorObj.UnprocessableEntity(err.message));
    }

    resolve(user);
  });
});

module.exports = {
  createUserAsync,
  DEFAULT_FIELDS,
  loginUserAsync,
  getUserAsync
};
