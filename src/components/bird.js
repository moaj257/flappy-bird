import React from 'react';
import {Image, Animated} from 'react-native';
import Images from '../utils/images';

export default class Bird extends React.Component {
  constructor(props) {
    super(props);
    const {body} = this.props;
    this.animatedValue = new Animated.Value(body.velocity.y);
  }

  render() {
    const {body, pose} = this.props;
    const {position, bounds} = body;
    const {min, max} = bounds;
    const width = max.x - min.x;
    const height = max.y - min.y;
    const x = position.x - width / 2;
    const y = position.y - height / 2;

    this.animatedValue.setValue(body.velocity.y);
    let rotation = this.animatedValue.interpolate({
      inputRange: [-10, 0, 10, 20],
      outputRange: ['-20deg', '0deg', '15deg', '45deg'],
      extrapolate: 'clamp',
    })

    const image = Images[`bird${pose}`];
    
    return(
      <Animated.Image style={{
        position: 'absolute',
        top: y,
        left: x,
        width,
        height,
        transform: [{rotate: rotation}]
      }} resizeMode='stretch' source={image} />
    )
  }
}