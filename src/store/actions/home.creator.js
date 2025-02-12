import Geolocation from 'react-native-geolocation-service';
import io from 'socket.io-client/dist/socket.io';

import * as actionType from './actions';
import { calculateFare } from '../helpers';
import { createTowBooking, setAcceptedDriver } from './';

import axios from 'axios';
import axiosBackend from '../../axios-backend';

const SOCKET_URL = 'http://localhost:5000/';
const SOCKET_CONFIG = {
  timeout: 10000,
  jsonp: false,
  transports: ['websocket'],
  autoConnect: true
};

const getCurrentLocation = (isPickup) => {
  return (dispatch, store) => {
    Geolocation.getCurrentPosition(position => {
      dispatch({
        type: actionType.GET_CURRENT_LOCATION,
        isPickup,
        position: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      });

      if (isPickup) {
        dispatch(getNearbyDrivers());
      }
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

    if (isPickup) {
      dispatch(getNearbyDrivers());
    }
    const hasPickupLocation = store().home.pickupLocation.latitude && store().home.pickupLocation.longitude
    const hasDropoffLocation = store().home.dropoffLocation.latitude && store().home.dropoffLocation.longitude
    if (hasPickupLocation && hasDropoffLocation) {
      dispatch(getDistanceMatrix(dispatch, store));
    }
  };
}

// TODO: remove export here and use in getInputLocation
// check previous
export function getDistanceMatrix() {
  return (dispatch, store) => {
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
        console.log("GET DISTANCE RESPONSE ERROR", response)
      }
    })
    .catch(error => console.log("GET DISTANCE REQUEST ERROR", error));
  };
}

const getCarType = (carType) => ({
  type: actionType.GET_CAR_TYPE,
  carType
});

const getTowTruckType = (towTruckType) => {
  return (dispatch, store) => {
    dispatch({
      type: actionType.GET_TOW_TRUCK_TYPE,
      towTruckType
    });
    setTimeout(() => (dispatch(dispatchFare()), 500);
  };
};

// get nearby drivers: from once pickup location has been entered
const getNearbyDrivers = (dispatch, store) => {
  return (dispatch, store) => {
    const lat = store().home.pickupLocation.latitude;
    const lng = store().home.pickupLocation.longitude;
    axiosBackend.get(`/driversLocations?latitude=${lat}&longitude=${lng}`)
    .then(response => {
      dispatch({
        type: actionType.GET_NEARBY_DRIVERS,
        nearbyDrivers: response.data.nearbyDrivers
      });
    })
    .catch(err => console.log("error", err) );
  };
};

const requestDrivers = () => {
  const socket = io(SOCKET_URL, SOCKET_CONFIG);
  return (dispatch, store) => {
    dispatch(createTowBooking());
    setTimeout(() => {
      const reqObj = {
        nearbyDrivers: store().home.nearbyDrivers,
        towBooking: store().newBooking.towBooking
      };
      axiosBackend.post('/towBookings/requestDrivers', reqObj)
        .then(res => {
          if (res.data.success) {
            socket.on('acceptedTowRequest', (data) => {
              console.log('driverAcceptedRequestListen', data);
              // if data: setAcceptedDriver
              dispatch(setAcceptedDriver());
            });
          }
        })
        .catch(error => console.log("towBookings ERROR", error));
    }, 1000);
  };
};

const makeCancelRequest = () => ({
  type: CANCEL_REQUEST
});

function dispatchFare() {
  const bases = {
    baseFare: 500,
    timeRate: 0.14,
    distanceRate: 0.97
  };
  return (dispatch, store) => {
    const routeInfo = store().home.routeInfo;
    const fare = calculateFare(bases, store().home.towTruckType, routeInfo.duration.value, routeInfo.distance.value);
    dispatch({
      type: actionType.GET_CALCULATED_FARE,
      fare
    });
  };
}

export {
  getCurrentLocation,
  getInputLocation,
  getCarType,
  getTowTruckType,
  requestDrivers,
  makeCancelRequest
};
