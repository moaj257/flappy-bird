import React from 'react';
import {View} from 'react-native';

export default class Bird extends React.Component {
  render() {
    const {size, body, color} = this.props;
    const {position} = body;
    const width = size[0];
    const height = size[1];
    const x = position.x - width / 2;
    const y = position.y - height / 2;
    
    return(
      <View style={{
        position: 'absolute',
        top: y,
        left: x,
        width,
        height,
        backgroundColor: color
      }} />
    )
  }
}