/*global Phaser*/
'use strict';

import Fire from './fire.js';

const FIRE_OFFSET_Y = -100;
const FIRE_OFFSET_X = 25;
const FIRE_SPEED = Phaser.Timer.HALF;
const SPEED = 100;

let bullet;

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

  // FIRE!!!
  if (game.input.keyboard.isDown(SPACEBAR)) {
    fire(sprite); 
  }
}

export function fire(game, sprite) {
  const {x, y} = this.sprite;
  bullet = new Fire(this.game, x + FIRE_OFFSET_X, y + FIRE_OFFSET_Y);
}
