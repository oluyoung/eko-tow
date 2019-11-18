import React from 'react';
import MapView from 'react-native-maps';

const NearbyDriversMarkers = (props) => {
  if (props.nearbyDrivers.length) {
    console.log(props.nearbyDrivers)
    return props.nearbyDrivers.map((driverLocation, idx) => {
      const coordinate = {
        latitude: driverLocation.coordinate[1],
        longitude: driverLocation.coordinate[0]
      };
      return (<MapView.Marker key={idx} coordinate={coordinate} pinColor='yellow' />);
    });
  }
  return null;
};

export default NearbyDriversMarkers;
