import ACTION_HANDLERS from '../handlers/mapHandler';

const deltas = {
  name: '',
  latitudeDelta: 0.0,
  longitudeDelta: 0.0
};

const initState = {
  pickupLocation: {
    ...deltas
  },
  dropoffLocation: {
    ...deltas
  }
};

const mapReducer = (state = initState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default mapReducer;
