// https://reactnavigation.org/docs/en/drawer-actions.html

import React, { Component } from 'React';
import { Header, Body, Title, Left, Right, Button, Icon } from 'native-base';

class CustomHeader extends Component {

  render() {
    // TODO: and use CustomFooter instead because it pushes up CustomHeader
    const backButton = (
      <Left>
        <Button
          transparent
          onPress={() => this.props.navigationProp.goBack()}>
          <Icon name='arrow-back' />
        </Button>
      </Left>
    );

    // onPress go to account settings
    const settingsButton = (
      <Right>
        <Button transparent>
          <Icon name='gear' />
        </Button>
      </Right>
    );

    const leftIcon = this.props.leftComponent ? this.props.leftComponent : backButton;
    // const rightIcon = this.props.rightComponent ? this.props.rightComponent : settingsButton;

    return (
      <Header transparent={this.props.transparent}>
        {leftIcon}
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
      </Header>
    );
  }
}

export default CustomHeader;
