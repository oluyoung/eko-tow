import Geolocation from 'react-native-geolocation-service';
import { Alert } from 'react-native';

import * as actionType from './actions';
import { calculateFare } from '../utility';
import { setAcceptedDriver } from './homeCreator';

import axios from '../../axios-backend';

// driver sets canceled, finished
  // FINISH BOOKING

// GET bookingS
// GET BOOKING: create receipt from booking
  // REPORT PROBLEM WITH BOOKING
  // GET RECEIPT FROM BOOKING
// CANCEL BOOKING

const createTowBooking = (dipatch, store) => {
  const data = {
    username: 'eman',
    driver: store().home.acceptedDriver,
    pickupLocation: {
      address: store().home.pickupLocation.address,
      name: store().home.pickupLocation.name,
      latitude: store().home.pickupLocation.latitude,
      longitude: store().home.pickupLocation.longitude
    },
    dropoffLocation: {
      address: store().home.dropoffLocation.address,
      name: store().home.dropoffLocation.name,
      latitude: store().home.dropoffLocation.latitude,
      longitude: store().home.dropoffLocation.longitude
    },
    fare: store().home.fare
  };

  axios.post('/towBookings', data)
    .then(res => {
      if (res.success) {
        // change screen on this
        dispatch({
          type: actionType.BOOKING_CREATED,
          towBooking: res.towBooking
        });
      }
    })
    .catch(error => console.log("CREATE_BOOKING_ERROR", error))
};

const updateTowBooking = () => {

};

const cancelTowBooking = () => {

};

export {
  createTowBooking,
  updateTowBooking
};
