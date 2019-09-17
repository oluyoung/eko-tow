const { buildQuery, throwNoEmailOrPasswordError } = require('../_helpers');
const { verifyPassword } = require('../../models/utils')
const oauthHelper = require('../oauth.helper');
const Errors = require('../../utils/errors').Errors;
const errorObj = new Errors();

const createUserAsync = async (data = {}, model) => {
    const Model = model;
    throwNoEmailOrPasswordError(data.email, data.password);
    const newUser = new Model({...data});
    return await newUser.save();
}

const loginUserAsync = async (data = {}, model) => {
  const Model = model;
  throwNoEmailOrPasswordError(data.email, data.password);
  const fieldStr = 'created_at email firstName lastName password profilePhoto';
  const user = await Model.findOne({email}, fieldStr);
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
const getUserAsync = (query, options = {}, defaultFields, model) => new Promise((resolve, reject) => {
  const Model = model;
  if (!query || typeof query !== 'object') {
    throw errorObj.UnprocessableEntity('Invalid query');
  }

  options.select = defaultFields;

  let userQuery = Model.findOne(query);
  userQuery = buildQuery(userQuery, options);
  userQuery.exec((err, user) => {
    if (err) {
      console.error(err);
      return reject(errorObj.UnprocessableEntity(err.message));
    }

    resolve(user);
  });
});

const updateUserAsync = (query, options = {}, model) => new Promise((resolve, reject) => {
  const Model = model;
  if (!query || typeof query !== 'object') {
    throw errorObj.UnprocessableEntity('Invalid query');
  }

  options.select = defaultFields;

  let userQuery = Model.findByIdAndUpdate(query);
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
  loginUserAsync,
  getUserAsync,
  updateUserAsync
};
