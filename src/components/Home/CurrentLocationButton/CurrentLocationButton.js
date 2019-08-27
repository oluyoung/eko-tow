import React from 'react';

import { View, Dimensions } from 'react-native';
import { Icon } from 'native-base';

import styles from './styles';

const HEIGHT = Dimensions.get('window').height;

const CurrentLocationButton = (props) => {
  const callback = props.callback ? props.callback : () => console.log('Callback fn() not passed');
  const bottom = props.bottom ? props.bottom : 200;
  return (
    <View style={{...styles.container, top: (HEIGHT - bottom) }}>
      <Icon
        name="home"
        color="#000000"
        size={20}
        onPress={() => callback()} />
    </View>
  )
}

export default CurrentLocationButton;
