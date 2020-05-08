import React from 'react';
import {View, Image} from 'react-native';
import Images from '../utils/images';

export default class Floor extends React.Component {
  render() {
    const {body} = this.props;
    const {position, bounds} = body;
    const {min, max} = bounds;
    const width = max.x - min.x;
    const height = max.y - min.y;
    const x = position.x - width/2;
    const y = position.y - height/2;

    const imageIterations = Math.ceil(width/height);
    
    return(
      <View style={{
        position: 'absolute',
        top: y,
        left: x,
        width,
        height,
        overflow: 'hidden',
        flexDirection: 'row',
      }}>
        {Array.apply(null, Array(imageIterations)).map((el, i) => (
          <Image style={{width, height}} key={`floor-${i}`} source={Images.floor} />
        ))}
      </View>
    )
  }
}