/*global Phaser, game*/
'use strict';

import {spawnFire} from './fire.js';
import {debounce} from './util.js';

const FIRE_SPEED = Phaser.Timer.SECOND;
const SPEED = 150;

const ACTION = {
  NONE: 'PLAYER_ACTION_NONE'
  , FIRE: 'PLAYER_ACTION_FIRE'
  , MOVE: {
    LEFT: 'PLAYER_ACTION_LEFT'
    , RIGHT: 'PLAYER_ACTION_RIGHT'
    , TO: {
      POINTER: 'PLAYER_ACTION_MOVE_TO_POINTER'
    }
  }
};

const atFireSpeed = debounce(FIRE_SPEED);

export function playerControl(sprite) {
  const {LEFT, RIGHT, SPACEBAR} = Phaser.Keyboard;
  const pointer = game.input.activePointer;
  const actions = playerAction();

  
  // Handle each action
  actions.forEach((action) => {
    switch (action) {
      case ACTION.FIRE:
        atFireSpeed(game.time.events, () => {
          const {x, y} = sprite;

          spawnFire(x, y);
        });
        break;
      
      case ACTION.MOVE.TO.POINTER:
        game.physics.arcade.moveToXY(sprite, pointer.x, sprite.y, SPEED);
        break;
    }
  });

  // Movement keys
  // if (game.input.keyboard.isDown(LEFT)) { 
  //   sprite.body.velocity.x = -SPEED;
  // }
  // else if (game.input.keyboard.isDown(RIGHT)) {
  //   sprite.body.velocity.x = SPEED;
  // }
  // else {
  //   sprite.body.velocity.x = 0;
  // }
}

// Returns an array of player actions for this tick
// example: [ACTIONS.FIRE, ACTIONS.MOVE]
function playerAction() {
  const {LEFT, RIGHT, SPACEBAR} = Phaser.Keyboard;
  let actions = [];
  
  // Touch controls
  if (game.input.activePointer.isDown) {
    actions.push(ACTION.MOVE.TO.POINTER); 
    actions.push(ACTION.FIRE);
  }
  

  // Keyboard controls
  if (game.input.keyboard.isDown(SPACEBAR)) {
    actions.push(ACTION.FIRE);
  }
  if (game.input.keyboard.isDown(LEFT)) { 
    actions.push(ACTION.MOVE.LEFT);
  }
  else if (game.input.keyboard.isDown(RIGHT)) {
    actions.push(ACTION.MOVE.RIGHT);
  }
  
  
  return actions;
}
