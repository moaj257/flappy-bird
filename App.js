import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import Matter from 'matter-js';
import Constants from './src/utils/constants';
import Physics from './src/utils/physics';
import Bird from './src/components/bird';
import Wall from './src/components/wall';
import Floor from './src/components/floor';
import Images from './src/utils/images';

const randomBetween = (min, max) => Math.floor(Math.random()*(max-min + 1) + min);

const generatePipes = () => {
  let topPipeHeight = randomBetween(100, (Constants.MAX_HEIGHT/2)-100);
  let bottomPipeHeight = Constants.MAX_HEIGHT-topPipeHeight-Constants.GAP_SIZE;

  let sizes = [topPipeHeight, bottomPipeHeight];
  if(Math.random() < 0.5) {
    sizes = sizes.reverse();
  }

  return sizes;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.gameEngine = null;
    this.entities = this.setupWorld();
    this.state = {
      running: true,
    };
  }

  setupWorld = () => {
    let engine = Matter.Engine.create({enableSleeping: false});
    let world = engine.world;
    world.gravity.y = 0.0;
    let bird = Matter.Bodies.rectangle(Constants.MAX_WIDTH/2, Constants.MAX_HEIGHT/2, Constants.BIRD_WIDTH, Constants.BIRD_HEIGHT);
    let floor1 = Matter.Bodies.rectangle(Constants.MAX_WIDTH/2, Constants.MAX_HEIGHT-45, Constants.MAX_WIDTH + 4, 50, {isStatic: true});
    let floor2 = Matter.Bodies.rectangle(Constants.MAX_WIDTH+(Constants.MAX_WIDTH/2), Constants.MAX_HEIGHT-45, Constants.MAX_WIDTH + 4, 50, {isStatic: true});

    Matter.World.add(world, [bird, floor1, floor2]);

    Matter.Events.on(engine, 'collisionStart', event => {
      let pairs = event.pairs;
      this.gameEngine.dispatch({type: 'game-over'});
    });

    return {
      physics: {engine, world},
      floor1: {body: floor1, renderer: Floor},
      floor2: {body: floor2, renderer: Floor},
      bird: {body: bird, pose: 1, renderer: Bird},
    }
  }

  onEvent = e => {
    if(e.type === 'game-over')
      this.setState({running: false});
  }

  reset = () => {
    this.gameEngine.swap(this.setupWorld());
    this.setState({running: true});
  }

  render() {
    const {running} = this.state;
    return (
      <View style={styles.container}>
        <Image source={Images.background} style={[styles.gameContainer, styles.backgroundImage]} resizeMode='stretch' />
        <GameEngine ref={ref => this.gameEngine = ref} style={styles.gameContainer} systems={[Physics]} running={running} entities={this.entities} onEvent={this.onEvent} />
        {!running && (
          <TouchableOpacity onPress={this.reset} style={[styles.gameContainer, styles.fullScreenButton]}>
            <View style={[styles.gameContainer, styles.fullScreen]}>
              <Text style={styles.gameOverText}>Game Over</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT,
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  fullScreenButton: {
    flex: 1,
  },
  fullScreen: {
    backgroundColor: 'black',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    color: 'white',
    fontSize: 48
  },
});

export default App;
