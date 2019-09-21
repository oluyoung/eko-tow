import ACTION_HANDLERS from '../handlers/towBookingHandler';

const initState = {
  towBookings: null,
  currentTowBooking: null
};

const towBookingReducer = (state = initState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default towBookingReducer;
