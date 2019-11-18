import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';

import { View } from 'react-native';
import styles from './styles';

import { getCurrentLocation, getNearbyDrivers, getDistanceMatrix } from '../../../store/actions';

import NearbyDriversMarkers from './NearbyDriversMarkers';

class MapContainer extends Component {
  state = {
    initialRegion: {
      latitude: 6.543844,
      longitude: 3.392540,
      latitudeDelta: 0.0,
      longitudeDelta: 0.0
    }
  };

  componentDidMount() {
    this.props.getCurrentLocation();
  }

  // it's not here that we need it
  centerToLocation = (region) => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
    this.map.animateToRegion({
      latitude, longitude, latitudeDelta, longitudeDelta
    })
  }

  render() {
    const pickupRegionExists = Boolean(this.props.pickupRegion.latitude && this.props.pickupRegion.longitude);
    const pickupMarker = pickupRegionExists ?
      <MapView.Marker coordinate={this.props.pickupRegion} pinColor='red' /> :
        null;

    if (pickupRegionExists) {
      this.centerToLocation(this.props.pickupRegion);
    }

    const dropoffRegionExists = Boolean(this.props.dropoffRegion.latitude && this.props.dropoffRegion.longitude && pickupRegionExists);
    const dropoffMarker = dropoffRegionExists ?
      <MapView.Marker coordinate={this.props.dropoffRegion} pinColor='green' /> :
        null;

    if (dropoffRegionExists) {
      // TODO: zoom out to see both
      this.centerToLocation(this.props.dropoffRegion);
      this.props.getDistanceMatrix();
    }

    const initialRegion = pickupRegionExists ? this.props.pickupRegion : this.state.initialRegion;

    return (
      <MapView
        initialRegion={initialRegion}
        provider={MapView.PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsCompass={true}
        rotateEnabled={false}
        ref={(map) => {this.map = map}}
        style={styles.map}>
        {pickupMarker}
        {
          pickupRegionExists && <NearbyDriversMarkers nearbyDrivers={this.props.nearbyDrivers} />
        }
        {dropoffMarker}
      </MapView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentLocation: () => dispatch(getCurrentLocation(true)),
    getNearbyDrivers: () => dispatch(getNearbyDrivers()),
    getDistanceMatrix: () => dispatch(getDistanceMatrix())
  };
};


export default connect(null, mapDispatchToProps)(MapContainer);
