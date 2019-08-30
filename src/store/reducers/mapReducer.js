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
  },
  routeInfo: {
    duration: {
      value: 0, // in sec
      text: ''
    },
    distance: {
      value: 0, // in m
      text: ''
    }
  },
  pricing: {
    fare: 0.0
  }
};

const mapReducer = (state = initState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default mapReducer;
