// https://reactnavigation.org/docs/en/drawer-actions.html

import React, { Component } from 'React';
import { Header, Body, Title, Left, Button, Icon } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';

class CustomHeader extends Component {

  render() {
    // TODO: remove tabFooter and use CustomFooter instead because it pushes up CustomHeader
    const backButton = (
      <Left>
        <Button transparent onPress={this.props.navigationProp.goBack}>
          <Icon name='arrow-back' />
        </Button>
      </Left>
    );

    const settingsButton = {
      <Right>
        <Button
          transparent
          onPress={this.props.navigationProp.dispatch(DrawerActions.toggleDrawer())}>
          <Icon name='gear' />
        </Button>
      </Right>
    };

    const leftIcon = this.props.leftComponent ? this.props.leftComponent : backButton;
    const rightIcon = this.props.rightComponent ? this.props.leftComponent : settingsButton;

    return (
      <Header>
        {leftIcon}
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        {rightIcon}
      </Header>
    );
  }
}

export default CustomHeader;
