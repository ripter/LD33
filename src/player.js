/*global Phaser*/
'use strict';

import Fire from './fire.js';
const SPEED = 100;

export function playerControl(game, sprite) {
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
}
