import React from 'react';

import Colors from '../../constants/Colors';

export default function TabBarIcon(props) {
  const color = props.focused ? Colors.tabIconSelected : Colors.tabIconDefault;
  return (
    <Icon name={props.name} style={{marginBottom: -3, fontSize: 26, color: color}}/>
  );
}
