import Geolocation from 'react-native-geolocation-service';

import * as actionType from './actions';

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
      console.log("ERROR", error)
    },
    {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    })
  }
}

const getInputLocation = (isPickup, name, lat, lng) => {
  return {
    type: actionType.GET_INPUT_LOCATION,
    isPickup,
    name,
    latitude: lat,
    longitude: lng
  }
}

export {
  getCurrentLocation,
  getInputLocation
}
