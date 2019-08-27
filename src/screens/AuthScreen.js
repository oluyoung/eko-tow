import React, { Component } from 'react';
import { Text } from 'react-native';

class AuthScreen extends Component {
  render() {
    return (
      <Text>Auth</Text>
    )
  }
}

export default connect()(AuthScreen);
