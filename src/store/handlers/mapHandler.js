import { updateObject } from '../utility';

const handleGetCurrentLocation = (state, action) => {
  const location = {
    name: 'Current Location',
    latitude: action.position.latitude,
    longitude: action.position.longitude
  };
  if (action.isPickup) {
    return updateObject(state, {
      pickupLocation: {
        ...state.pickupLocation,
        ...location
      }
    });
  }
  return updateObject(state, {
    dropoffLocation: {
      ...state.dropoffLocation,
      ...location
    }
  });
};

const handleGetInputLocation = (state, action) => {
  const location = {
    name: action.name,
    latitude: action.latitude,
    longitude: action.longitude
  };

  if (action.isPickup) {
    return updateObject(state, {
      pickupLocation: {
        ...state.pickupLocation,
        ...location
      }
    });
  }
  return updateObject(state, {
    dropoffLocation: {
      ...state.dropoffLocation,
      ...location
    }
  });
};

const handleGetDistanceMatrix = (state, action) => {
  return updateObject(state, {
      routeInfo: {
        duration: {
          value: action.duration.value,
          text: action.duration.text
        },
        distance: {
          value: action.distance.value,
          text: action.distance.text
        }
      }
    }
  );
};

const handleGetCalculatedFare = (state, action) => {
  return updateObject(state, {
    pricing: {
      fare: action.fare
    }
  });
};

const ACTION_HANDLERS = {
  GET_CURRENT_LOCATION: handleGetCurrentLocation,
  GET_INPUT_LOCATION: handleGetInputLocation,
  GET_DISTANCE_MATRIX: handleGetDistanceMatrix,
  GET_CALCULATED_FARE: handleGetCalculatedFare
};

export default ACTION_HANDLERS;
