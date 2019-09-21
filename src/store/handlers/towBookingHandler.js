import { updateObject } from '../utility';

const handleBookingCreated = (state, action) => {
  return updateObject(state, {
    ...state,
    currentTowBooking: action.towBooking
  });
}

const handleGetBooking = (state, action) => {

}

const handleGetBookings = (state, action) => {

}

const ACTION_HANDLERS = {
  BOOKING_CREATED: handleBookingCreated,
  GET_BOOKING: handleGetBooking,
  GET_BOOKINGS: handleGetBookings
};

export default ACTION_HANDLERS;
