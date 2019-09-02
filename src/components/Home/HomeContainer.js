import React, { Component } from 'react';
import { connect } from 'react-redux';

import CurrentLocationButton from './CurrentLocationButton/CurrentLocationButton';
import MapContainer from './MapContainer/MapContainer';
import PickupDropoffInput from './PickupDropoffInput/PickupDropoffInput';
import FareDisplay from './FareDisplay/FareDisplay';
import VehicleTypesDisplay from './VehicleTypesDisplay/VehicleTypesDisplay';
import Aux from '../Aux';

class HomeContainer extends Component {

  render() {
    let renderVehicleTypesDisplay = null;
    let locationBottom = null;
    const isRouteInfoCalculated = this.props.routeInfo.duration.value && this.props.routeInfo.distance.value;
    if (isRouteInfoCalculated) {
      locationBottom = 300;
      renderVehicleTypesDisplay = this.props.carType ?
        <VehicleTypesDisplay useTowTruckList={true} /> : <VehicleTypesDisplay />;
    }

    // what to do after fare has been displayed
    const renderFooterDisplay = this.props.fare > 0 ? <FareDisplay fare={this.props.fare} /> : renderVehicleTypesDisplay;

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
        <CurrentLocationButton callback={this.centerToUserLocation} bottom={locationBottom} />
        {renderFooterDisplay}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    pickupLocation: state.home.pickupLocation,
    dropoffLocation: state.home.dropoffLocation,
    routeInfo: state.home.routeInfo,
    fare: state.home.fare,
    carType: state.home.carType,
    towTruckType: state.home.towTruckType
  };
};

export default connect(mapStateToProps)(HomeContainer);
