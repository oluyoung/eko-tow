import ACTION_HANDLERS from '../handlers/towBookings.handler';

const initState = {
  towBooking: null
};

const towBookingsReducer = (state = initState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default towBookingsReducer;
