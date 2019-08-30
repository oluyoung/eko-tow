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
      console.error("GET CURRENT LOCATION ERROR", error);
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
    const hasPickupLocation = store().map.pickupLocation.latitude && store().map.pickupLocation.longitude
    const hasDropoffLocation = store().map.dropoffLocation.latitude && store().map.dropoffLocation.longitude
    if (hasPickupLocation && hasDropoffLocation) {
      getDistanceMatrix(dispatch, store);
    }
  };
}

const getDistanceMatrix = (dispatch, store) => {
  const queryObj = {
    origins: store().map.pickupLocation.latitude + ',' + store().map.pickupLocation.longitude,
    destinations: store().map.dropoffLocation.latitude + ',' + store().map.dropoffLocation.longitude,
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
        const matrix = response.data.rows[0].elements[0];
        _dispatchDistanceMatrix(dispatch, matrix);
        setTimeout(() => _dispatchFare(dispatch, store), 1000);
      } else {
        console.error("GET DISTANCE RESPONSE ERROR")
      }
    })
    .catch(error => console.error("GET DISTANCE REQUEST ERROR", error));
}

function _dispatchDistanceMatrix(dispatch, matrix) {
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
}

function _dispatchFare(dispatch, store) {
  const bases = {
    baseFare: 500,
    timeRate: 0.14,
    distanceRate: 0.97
  };
  const routeInfo = store().map.routeInfo;
  const fare = calculateFare(bases, routeInfo.duration.value, routeInfo.distance.value);
  dispatch({
    type: actionType.GET_CALCULATED_FARE,
    fare
  });
}

export {
  getCurrentLocation,
  getInputLocation
};
