import React, { Component } from 'react';

import { Container, Header, Left, Button, Icon, Content } from 'native-base';

import HomeContainer from '../components/Home/HomeContainer';

export default class HomeScreen extends Component {
  render() {
    // const leftComponent = (
    //   <Left>
    //     <Button
    //       transparent
    //       onPress={this.props.navigation.dispatch(DrawerActions.toggleDrawer())}>
    //       <Icon name='menu' />
    //     </Button>
    //   </Left>
    // );
    //
    // <CustomHeader
    //   transparent={true}
    //   navigationProp={this.props.navigation}
    //   leftComponent={leftComponent} />

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
