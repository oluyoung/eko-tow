import React from 'react';

import { View, Text } from 'react-native';
import { Icon } from 'native-base';

import styles from './styles';

const FareDisplay = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>FARE: ₦{props.fare}</Text>
    </View>
  )
};

export default FareDisplay;
