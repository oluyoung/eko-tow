import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { Alert } from 'react-native';

import * as actionType from './actions';
import { calculateFare } from '../utility';

const getCurrentLocation = (isPickup) => {
  return (dispatch) => {
    Geolocation.getCurrentPosition(position => {
      dispatch({
        type: actionType.GET_CURRENT_LOCATION,
        isPickup,
        position: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      });
    }, error => {
      console.log("GET CURRENT LOCATION ERROR", error);
    },
    {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    })
  }
}

const getInputLocation = (isPickup, name, lat, lng) => {
  return (dispatch, store) => {
    dispatch({
      type: actionType.GET_INPUT_LOCATION,
      isPickup,
      name,
      latitude: lat,
      longitude: lng
    });
    const hasPickupLocation = store().home.pickupLocation.latitude && store().home.pickupLocation.longitude
    const hasDropoffLocation = store().home.dropoffLocation.latitude && store().home.dropoffLocation.longitude
    if (hasPickupLocation && hasDropoffLocation) {
      getDistanceMatrix(dispatch, store);
    }
  };
}

function getDistanceMatrix(dispatch, store) {
  const queryObj = {
    origins: store().home.pickupLocation.latitude + ',' + store().home.pickupLocation.longitude,
    destinations: store().home.dropoffLocation.latitude + ',' + store().home.dropoffLocation.longitude,
    mode: 'driving',
    key: 'AIzaSyATCzkPfrrXsKA3BIAv4XGdGU1_NjxmRgM',
    units: 'imperial'
  };

  let serializedQuery = '?';
  for (let key in queryObj) {
    serializedQuery += `${key}=${queryObj[key]}&`;
  }

  axios.get('https://maps.googleapis.com/maps/api/distancematrix/json' + serializedQuery)
    .then(response => {
      if (response.data.status === 'OK') {
        console.log("response", response);
        const matrix = response.data.rows[0].elements[0];
        dispatch({
          type: actionType.GET_DISTANCE_MATRIX,
          duration: {
            value: matrix.duration.value,
            text: matrix.duration.text
          },
          distance: {
            value: matrix.distance.value,
            text: matrix.distance.text
          }
        });
      } else {
        console.log("GET DISTANCE RESPONSE ERROR")
      }
    })
    .catch(error => console.log("GET DISTANCE REQUEST ERROR", error));
}

const getCarType = (carType) => {
  return {
    type: actionType.GET_CAR_TYPE,
    carType
  }
};

const getTowTruckType = (towTruckType) => {
  return (dispatch, store) => {
    dispatch({
      type: actionType.GET_TOW_TRUCK_TYPE,
      towTruckType
    });

    setTimeout(() => _dispatchFare(dispatch, store), 1000);
  }
};

// get nearby drivers: from once pickup location has been entered
// make request to drivers
// cancel request

const makeCancelRequest = () => {
  return dispatch({
    type: CANCEL_REQUEST
  });
};

function _dispatchFare(dispatch, store) {
  const bases = {
    baseFare: 500,
    timeRate: 0.14,
    distanceRate: 0.97
  };
  const routeInfo = store().home.routeInfo;
  const fare = calculateFare(bases, store().home.towTruckType, routeInfo.duration.value, routeInfo.distance.value);
  dispatch({
    type: actionType.GET_CALCULATED_FARE,
    fare
  });
}

export {
  getCurrentLocation,
  getInputLocation,
  getCarType,
  getTowTruckType
};
