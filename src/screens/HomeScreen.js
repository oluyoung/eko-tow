import React, { Component } from 'react';
import MapView from 'react-native-maps';

import { Container, Header, Left, Button, Icon, Content } from 'native-base';

import HomeContainer from '../components/Home/HomeContainer';

export default class HomeScreen extends Component {
  render() {
    return (
      <Container>
        <Header transparent>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
        </Header>
        <Content contentContainerStyle={{flex: 1}}>
          <HomeContainer />
        </Content>
      </Container>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};
