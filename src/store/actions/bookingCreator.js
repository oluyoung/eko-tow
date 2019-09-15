import Geolocation from 'react-native-geolocation-service';
import { Alert } from 'react-native';

import * as actionType from './actions';
import { calculateFare } from '../utility';

import axios from '../../axios';


// CREATE BOOKING
  // CREATE RECEIPT
// GET bookingS
// GET BOOKING
  // REPORT PROBLEM WITH BOOKING
  // GET RECEIPT FROM BOOKING
// CANCEL BOOKING

/*
const createBooking = () => {
  return (dispatch, store) => {
    const payload = {
      data: {
        email: store().user.email,
        pickup: {
          address: store().home.pickupLocation.address,
          name: store().home.pickupLocation.name,
          latitude: store().home.pickupLocation.latitude,
          longitude: store().home.pickupLocation.longitude
        },
        dropoff: {
          address: store().home.dropoffLocation.address,
          name: store().home.dropoffLocation.name,
          latitude: store().home.dropoffLocation.latitude,
          longitude: store().home.dropoffLocation.longitude
        },
        fare: store().home.fsare,
        status: 'pending'
      }
    };

    axios.post('http://localhost:3000/api/bookings', payload)
      .then(res => {
        dispatch({
          type: actionType.CREATE_BOOKING,
          booking: res.body
        });
      })
      .catch(err => console.log("CREATE_BOOKING_ERROR", error))
  }
};
*/
