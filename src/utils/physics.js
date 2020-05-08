import Matter from 'matter-js';
import Constants from './constants';

let tick = 0;
let pose = 1;

const Physics = (entities, {touches, time}) => {
  let engine = entities.physics.engine;
  let bird = entities.bird.body;

  touches.filter(t => t.type === 'press').forEach(t => {
    Matter.Body.applyForce(bird, bird.position, {x: 0.0, y: -0.1});
  });

  // for(let i = 1; i <= 4; i++) {
  //   if(entities[`pipe${i}`].body.position.x <= -1 * (Constants.PIPE_WIDTH/2)){
  //     Matter.Body.setPosition(entities[`pipe${i}`].body, {x: Constants.MAX_WIDTH * 2 - (Constants.PIPE_WIDTH/2), y: entities[`pipe${i}`].body.position.y});
  //   } else {
  //     Matter.Body.translate(entities[`pipe${i}`].body, {x: -1, y: 0});
  //   }
  // }

  Object.keys(entities).forEach(key => {
    if(key.indexOf('floor') === 0) {
      if(entities[key].body.position.x <= -1*Constants.MAX_WIDTH/2) {
        Matter.Body.setPosition(entities[key].body, {x: Constants.MAX_WIDTH + (Constants.MAX_WIDTH/2), y: entities[key].body.position.y})
      } else { 
        Matter.Body.translate(entities[key].body, {x: -2, y: 0});
      }
    }
  });

  Matter.Engine.update(engine, time.delta);
  tick += 1;
  if(tick % 5 == 0) {
    pose = pose + 1;
    if(pose > 3) {
      pose = 1;
    }
    entities.bird.pose = pose;
  }

  return entities;
}

export default Physics;