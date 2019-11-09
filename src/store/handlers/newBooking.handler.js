import { updateObject } from '../utility';

const handleDispatchNewTowBooking = (state, action) => {
  return updateObject(state, {
    newTowBooking: action.towBooking
  });
};

const handleBookingCreated = (state, action) => {
  return updateObject(state, {
    currentTowBooking: action.towBooking
  });
};


const handleSetAcceptedDriver = (state, action) => {
  return updateObject(state, {
    currentTowBooking: updateObject(state.currentTowBooking, {
      driver: action.driver
    })
  });
};

const ACTION_HANDLERS = {
  DISPATCH_NEW_BOOKING: handleDispatchNewTowBooking,
  BOOKING_CREATED: handleBookingCreated,
  SET_ACCEPTED_DRIVER: handleSetAcceptedDriver
};

export default ACTION_HANDLERS;
