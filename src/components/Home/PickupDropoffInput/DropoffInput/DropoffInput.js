import React from 'react';

import { Dimensions } from 'react-native';
import SearchBox from '../../../UI/SearchBox/SearchBox';

const WIDTH = Dimensions.get('window').width;

const DropoffInput = (props) => {
  return (
    <SearchBox
      icon="navigate"
      containerStyle={searchBoxContainerStyle}
      placeholder="Tow Dropoff"
      onPress={props.onPress}
      value={props.value} />
  )
}

export default DropoffInput;

const searchBoxContainerStyle = {
  zIndex: 9,
  position: 'absolute',
  top: 105,
  left: 20,
  backgroundColor: '#fff',
  width: (WIDTH-40)
}
