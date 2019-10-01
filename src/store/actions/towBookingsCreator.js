import Geolocation from 'react-native-geolocation-service';
import { Alert } from 'react-native';

import * as actionType from './actions';
import { setNewTowBooking } from '../helpers';

import axios from '../../axios-backend';

// driver sets canceled, finished
  // FINISH BOOKING

// GET bookingS
// GET BOOKING: create receipt from booking
  // REPORT PROBLEM WITH BOOKING
  // GET RECEIPT FROM BOOKING
// CANCEL BOOKING

const createTowBooking = () => {
  return (dispatch, store) => {
    axios.post('/towBookings', setNewTowBooking(store))
      .then(res => {
        if (res.data.success) {
          // change screen on this
          dispatch({
            type: actionType.BOOKING_CREATED,
            towBooking: res.data.towBooking
          });
        }
      })
      .catch(error => console.log("CREATE_BOOKING_ERROR", error))
  };
};

const setAcceptedDriver = driver => {
  // store().towBookings.currentTowBooking status to 'ACCEPTED'
  return {
    type: actionType.SET_ACCEPTED_DRIVER,
    driver
  };
};

const updateTowBooking = () => {
  return (dispatch, store) => {
    axios.put(`/towBookings/${id}`, store().towBookings.currentTowBooking)
      .then(res => {
        if (res.success) {
          // change screen on this
          dispatch({
            type: actionType.BOOKING_CREATED,
            currentTowBooking: res.towBooking
          });
        }
      })
      .catch(error => console.log("CREATE_BOOKING_ERROR", error))
  }
};

const cancelTowBooking = () => {

};

export {
  createTowBooking,
  setAcceptedDriver,
  updateTowBooking,
  cancelTowBooking
};
