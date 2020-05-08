import React from 'react';
import {Image} from 'react-native';
import Images from '../utils/images';

export default class Bird extends React.Component {
  render() {
    const {body, pose} = this.props;
    const {position, bounds} = body;
    const {min, max} = bounds;
    const width = max.x - min.x;
    const height = max.y - min.y;
    const x = position.x - width / 2;
    const y = position.y - height / 2;

    const image = Images[`bird${pose}`];
    
    return(
      <Image style={{
        position: 'absolute',
        top: y,
        left: x,
        width,
        height,
      }} resizeMode='stretch' source={image} />
    )
  }
}