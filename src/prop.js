'use strict';

import {PROP} from './constants.js';

export function addAnimation(sprite) {
  const type = sprite.name; //Tiled calls it name instead of type
  
  switch(type) {
    case PROP.SHRUB: 
      toShrub(sprite);
      break;
    case PROP.TREE:
      toTree(sprite);
      break;
  }
  
  return sprite;
};

export function onHit(sprite) {
  const type = sprite.name; //Tiled calls it name instead of type
  
  switch(type) {
    case PROP.SHRUB: 
      hitShrub(sprite);
      break;

    case PROP.TREE:
      hitTree(sprite);
      break;
  }
  
  return sprite;
}

//
// Add animation
function toShrub(sprite) {
  sprite.health = 2;
  // set the animations
  sprite.animations.add('norm', [0]);
  sprite.animations.add('burn', [1]);
  sprite.animations.add('dead', [2]);
  sprite.animations.play('norm', 24, true);
  
  return sprite;
}

function toTree(sprite) {
  sprite.health = 3;
  // set the animations
  sprite.animations.add('norm', [0]);
  sprite.animations.add('burn', [1]);
  sprite.animations.add('dead', [2]);
  sprite.animations.play('norm', 24, true);
  
  return sprite;
}

//
// Hit methods
function hitShrub(sprite) {
  const health = sprite.health -1;
  
  if (health === 1) {
    sprite.animations.play('dead');
  }
  
  if (health === 0) {
    sprite.kill();
  }
  
  sprite.health = health;
  return sprite;
}

function hitTree(sprite) {
  const health = sprite.health -1;
  
  if (health === 2) {
    sprite.animations.play('burn');
  }

  if (health === 1) {
    sprite.animations.play('dead');
  }
  
  if (health === 0) {
    sprite.kill();
  }
  
  sprite.health = health;
  return sprite;
}
