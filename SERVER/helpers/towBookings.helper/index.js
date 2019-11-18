const TowBooking = require('../../models/towBooking');
const { buildQuery } = require('../_helpers');
const Errors = require('../../utils/errors').Errors;
const errorObj = new Errors();

const getTowBookingAsync = (query, options = {}) => new Promise((resolve, reject) => {
  if (!query || typeof query !== 'object') {
    throw errorObj.UnprocessableEntity('Invalid query');
  }

  let query = TowBooking.findOne(query);
  query.exec((err, towBooking) => {
    if (err) {
      console.error(err);
      return reject(errorObj.UnprocessableEntity(err.message));
    }

    resolve(towBooking);
  });
});

const getTowBookingsAsync = (query, options = {}) => new Promise((resolve, reject) => {
  if (!query || typeof query !== 'object') {
    throw errorObj.UnprocessableEntity('Invalid query');
  }

  let query = TowBooking.find({...query, status: 'COMPLETED'});
  query.exec((err, towBookings) => {
    if (err) {
      console.error(err);
      return reject(errorObj.UnprocessableEntity(err.message));
    }

    resolve(towBookings);
  });
});

module.exports = {
  getTowBookingAsync
}
