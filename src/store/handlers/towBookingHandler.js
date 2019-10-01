import { updateObject } from '../utility';

const handleDispatchNewTowBooking = (state, action) => {
  newTowBooking: action.towBooking
};

const handleBookingCreated = (state, action) => {
  return updateObject(state, {
    ...state,
    currentTowBooking: action.towBooking
  });
};


const handleSetAcceptedDriver = (state, action) => {
  return updateObject(state, {
    ...state,
    currentTowBooking: {
      ...state.currentTowBooking,
      driver: action.driver
    }
  });
};

const handleGetBooking = (state, action) => {

};

const handleGetBookings = (state, action) => {

};

const ACTION_HANDLERS = {
  GET_BOOKING: handleGetBooking,
  GET_BOOKINGS: handleGetBookings,
  DISPATCH_NEW_BOOKING: handleDispatchNewTowBooking,
  BOOKING_CREATED: handleBookingCreated,
  SET_ACCEPTED_DRIVER: handleSetAcceptedDriver
};

export default ACTION_HANDLERS;
