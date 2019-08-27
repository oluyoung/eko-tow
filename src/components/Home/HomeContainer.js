import React, { Component } from 'react';
import { connect } from 'react-redux';

import CurrentLocationButton from './CurrentLocationButton/CurrentLocationButton';
import MapContainer from './MapContainer/MapContainer';
import PickupDropoffInput from './PickupDropoffInput/PickupDropoffInput';
import Aux from '../Aux';

class HomeContainer extends Component {

  render() {
    return (
      <Aux>
        <MapContainer
          pickupRegion={this.props.pickupLocation}
          dropoffRegion={this.props.dropoffLocation}
          />
        <PickupDropoffInput
          getCurrentLocation={this.props.getCurrentLocation}
          pickupLocationName={this.props.pickupLocation.name}
          dropoffLocationName={this.props.dropoffLocation.name}
           />
        <CurrentLocationButton callback={this.centerToUserLocation} />
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    pickupLocation: state.map.pickupLocation,
    dropoffLocation: state.map.dropoffLocation
  };
};

export default connect(mapStateToProps)(HomeContainer);
