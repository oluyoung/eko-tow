import ACTION_HANDLERS from '../handlers/newBooking.handler';

const initState = {
  towBooking: null
};

const newBookingReducer = (state = initState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default newBookingReducer;
