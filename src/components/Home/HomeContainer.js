import React, { Component } from 'react';
import { connect } from 'react-redux';

import CurrentLocationButton from './CurrentLocationButton/CurrentLocationButton';
import MapContainer from './MapContainer/MapContainer';
import PickupDropoffInput from './PickupDropoffInput/PickupDropoffInput';
import FareDisplay from './FareDisplay/FareDisplay';
import Aux from '../Aux';

class HomeContainer extends Component {

  render() {
    const renderFareDisplay = this.props.fare > 0 ? <FareDisplay fare={this.props.fare} /> : null;
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
        {renderFareDisplay}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    pickupLocation: state.map.pickupLocation,
    dropoffLocation: state.map.dropoffLocation,
    fare: state.map.pricing.fare
  };
};

export default connect(mapStateToProps)(HomeContainer);
