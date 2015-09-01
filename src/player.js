/*global Phaser, game*/
'use strict';

import {spawnFire} from './fire.js';
import {debounce} from './util.js';

const FIRE_SPEED = Phaser.Timer.SECOND;
const SPEED = 150;

const atFireSpeed = debounce(FIRE_SPEED);

export function playerControl(sprite) {
  const {LEFT, RIGHT, SPACEBAR} = Phaser.Keyboard;

  // Movement keys
  if (game.input.keyboard.isDown(LEFT)) { 
    sprite.body.velocity.x = -SPEED;
  }
  else if (game.input.keyboard.isDown(RIGHT)) {
    sprite.body.velocity.x = SPEED;
  }
  else {
    sprite.body.velocity.x = 0;
  }

  // Spacebar to FIRE
  if (game.input.keyboard.isDown(SPACEBAR)) {
    atFireSpeed(game.time.events, () => {
      const {x, y} = sprite;

      return spawnFire(x, y);
    });
  }
}

// Attempt to fire from sprite's position.
// Will debounce calls >= delay
function fireWithDelay(delay) {
  let _canFire = true;
  
  // Return a function that calls a method after delay
  return (fireFunc, sprite) => {
    const {x, y} = sprite;
    // poor man's debounce
    if (!_canFire) { return null; }
    // if we made it here, we are allowed to fire 
    _canFire = false;
    
    // Delay the firing
    // QUESTION? Do we need to distroy/kill/remove this timer?
    game.time.events.add(delay, () => {
      _canFire = true;
    });
    
    return fireFunc(x, y);
  };
}

// returns true if the player can fire.
function canPlayerFire() {
  const {SPACEBAR} = Phaser.Keyboard;

  // Make sure they are allowed to fire. (poor man's debounce)
  if (!_canFire) {
    return false;
  }
  
  // Spacebar to fire.
  if (game.input.keyboard.isDown(SPACEBAR)) {
    return true;
  }
  
  if (game.input.activePointer.isDown) {
    return true;
  }
}
