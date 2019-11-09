import { updateObject } from '../utility';
import { initState } from '../reducers/home.reducer';
import { getNewHomeState } from '../helpers';

const handleGetCurrentLocation = (state, action) => {
  const location = {
    name: 'Current Location',
    latitude: action.position.latitude,
    longitude: action.position.longitude
  };
  if (action.isPickup) {
    return updateObject(state, {
      pickupLocation: updateObject(state.pickupLocation, {
        ...location
      })
    });
  }
  return updateObject(state, {
    dropoffLocation: updateObject(state.dropoffLocation, {
      ...location
    })
  });
};

const handleGetInputLocation = (state, action) => {
  const location = {
    name: action.name,
    latitude: action.latitude,
    longitude: action.longitude
  };

  if (action.isPickup) {
    const initState = getNewHomeState();
    return updateObject(state, {
      ...initState,
      pickupLocation: updateObject(initState.pickupLocation, {
        ...location
      }),
      dropoffLocation: updateObject(initState.dropoffLocation, {
        ...location
      })
    });
  }
  return updateObject(state, {
    dropoffLocation: updateObject(state.dropoffLocation, {
      ...location
    })
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
    fare: action.fare
  });
};

const handleGetCarType = (state, action) => {
  return updateObject(state, {
    carType: action.carType
  });
}

const handleGetTowTruckType = (state, action) => {
  return updateObject(state, {
    towTruckType: action.towTruckType
  });
}

const handleCancelRequest = (state, action) => {
  return getNewHomeState();
}

const handleGetNearbyDrivers = (state, action) => {
  return updateObject(state, {
    nearbyDrivers: action.nearbyDrivers
  });
}

const handleSetAcceptedDriver = (state, action) => {
  return updateObject(state, {
    acceptedDriver: action.acceptedDriver
  });
}

const ACTION_HANDLERS = {
  GET_CURRENT_LOCATION: handleGetCurrentLocation,
  GET_INPUT_LOCATION: handleGetInputLocation,
  GET_DISTANCE_MATRIX: handleGetDistanceMatrix,
  GET_CALCULATED_FARE: handleGetCalculatedFare,
  GET_CAR_TYPE: handleGetCarType,
  GET_TOW_TRUCK_TYPE: handleGetTowTruckType,
  CANCEL_REQUEST: handleCancelRequest,
  GET_NEARBY_DRIVERS: handleGetNearbyDrivers,
  SET_ACCEPTED_DRIVER: handleSetAcceptedDriver
};

export default ACTION_HANDLERS;
