import React, { Component } from 'react';
import { connect } from 'react-redux';
import RNGooglePlaces from 'react-native-google-places';

import { getCurrentLocation, getInputLocation } from '../../../store/actions';

import Aux from '../../Aux';
import DropoffInput from './DropoffInput/DropoffInput';
import PickupInput from './PickupInput/PickupInput';

class PickupDropoffInput extends Component {
  openSearchModal = (isPickup) => {
    RNGooglePlaces.openAutocompleteModal({
      country: 'NG'
    })
    .then(place => {
      if (isPickup) {
        this.props.getInputLocation(true, place.name, place.location);
      } else {
        this.props.getInputLocation(false, place.name, place.location);
      }
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  }

  render() {
    return (
      <Aux>
        <PickupInput
          onPress={() => this.openSearchModal(true)}
          value={this.props.pickupLocationName} />
        <DropoffInput
          onPress={() => this.openSearchModal(false)}
          getCurrentLocationPress={() => this.getCurrentLocation(false)}
          value={this.props.dropoffLocationName} />
      </Aux>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentLocation: (isPickup) => dispatch(getCurrentLocation(isPickup)),
    getInputLocation: (isPickup, name, loc) => dispatch(getInputLocation(isPickup, name, loc.latitude, loc.longitude))
  };
};

export default connect(null, mapDispatchToProps)(PickupDropoffInput);
