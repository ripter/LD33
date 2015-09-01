/*global Phaser, game*/
'use strict';

import {spawnFire} from './fire.js';
import {debounce} from './util.js';

const FIRE_SPEED = Phaser.Timer.SECOND;
const SPEED = 150;

const ACTION = {
  FIRE: 'PLAYER_ACTION_FIRE'
  , LEFT: 'PLAYER_ACTION_LEFT'
  , RIGHT: 'PLAYER_ACTION_RIGHT'
  , NONE: 'PLAYER_ACTION_NONE'
};

const atFireSpeed = debounce(FIRE_SPEED);

export function playerControl(sprite) {
  const {LEFT, RIGHT, SPACEBAR} = Phaser.Keyboard;

  
  switch (playerAction()) {
    case ACTION.FIRE:
      atFireSpeed(game.time.events, () => {
        const {x, y} = sprite;

        spawnFire(x, y);
      });
      break;
  }

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
}

// Returns a const of the player's action.
// Only one action can happen per tick.
function playerAction() {
  const {LEFT, RIGHT, SPACEBAR} = Phaser.Keyboard;
  
  // Fire   
  if (game.input.keyboard.isDown(SPACEBAR)
      || game.input.activePointer.isDown) {

    return ACTION.FIRE;
  }
  
  return ACTION.NONE;
}
