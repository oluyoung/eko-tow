import React from 'react';

import { View, Text } from 'react-native';
import { Icon, Button } from 'native-base';
import Aux from '../../Aux';

import styles from './styles';

const FareDisplay = (props) => {
  return (
    <Aux>
      <View style={styles.container}>
        <Text style={styles.text}>FARE: ₦{props.fare}</Text>
      </View>
      <View style={styles.container}>
        <Button full transparent style={styles.button} onPress={props.reqTowPress}>
          <Text style={styles.button}>REQUEST A TOW</Text>
        </Button>
      </View>
    </Aux>
  )
};

export default FareDisplay;
