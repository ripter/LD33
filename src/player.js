/*global Phaser, game*/
'use strict';

import {spawnFire} from './fire.js';

const FIRE_SPEED = Phaser.Timer.HALF;
const SPEED = 100;

let canFire = true;

export function playerControl(sprite) {
  const {LEFT, RIGHT, SPACEBAR, ESC} = Phaser.Keyboard;

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
  if (canFire && game.input.keyboard.isDown(SPACEBAR)) {
    canFire = false;
    spawnFire(sprite.x, sprite.y);
 
    // Delay the firing
    game.time.events.add(FIRE_SPEED, () => {
      canFire = true;
    });
  }
  
  // DEBUG
  if (game.input.keyboard.isDown(ESC)) {
    console.log('rose is: ', game.rose);  
  }
}
