import React from 'React';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon, InputGroup, Input, Item } from 'native-base';

import styles from './styles';

const SearchBox = (props) => {
  return (
    <TouchableOpacity
      style={[styles.container, props.containerStyle]}
      onPress={props.onPress}>
      <View style={styles.leftCol}>
        <Icon name={props.icon} />
      </View>
      <View style={styles.centerCol}>
        <Text>{props.value ? props.value : props.placeholder}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default SearchBox;
