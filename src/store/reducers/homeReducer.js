import ACTION_HANDLERS from '../handlers/homeHandler';

const deltas = {
  name: '',
  latitudeDelta: 0.0,
  longitudeDelta: 0.0
};

export const initState = {
  pickupLocation: {
    ...deltas
  },
  dropoffLocation: {
    ...deltas
  },
  routeInfo: {
    duration: {
      value: null, // in sec
      text: ''
    },
    distance: {
      value: null, // in m
      text: ''
    }
  },
  carType: null,
  towTruckType: null,
  fare: 0.0,
  nearbyDrivers: [],
  acceptedDriver: null
};

const homeReducer = (state = initState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default homeReducer;
