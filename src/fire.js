/*global Phaser, game, bullets */
'use strict';

const SPEED = Phaser.Timer.HALF;
const OFFSET_Y = -100;
const OFFSET_X = 25;

// totally not a constructor
// constructors use NEW, we use SPAWN. Totally different! :)
export function spawnFire(x, y) {
  let sprite = bullets.create(x + OFFSET_X, y + OFFSET_Y, 'fire');

  sprite.body.velocity.y = -SPEED;
  return sprite;
}


