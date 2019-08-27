import React from 'react';

import { Dimensions } from 'react-native';
import SearchBox from '../../../UI/SearchBox/SearchBox';

const WIDTH = Dimensions.get('window').width;

const PickupInput = (props) => {
  return (
    <SearchBox
      icon="navigate"
      containerStyle={searchBoxContainerStyle}
      placeholder="Tow Pickup"
      onPress={props.onPress}
      value={props.value}
      />
  )
}

export default PickupInput;

const searchBoxContainerStyle = {
  zIndex: 9,
  position: 'absolute',
  top: 40,
  left: 20,
  backgroundColor: '#fff',
  width: (WIDTH-40)
}
