/*global Phaser, game, bullets */
'use strict';

const SPEED = 300;
const OFFSET_Y = 0;
const OFFSET_X = 29;

// totally not a constructor
// constructors use NEW, we use SPAWN. Totally different! :)
export function spawnFire(x, y) {
  let sprite = bullets.create(x + OFFSET_X, y + OFFSET_Y, 'fire');

  sprite.animations.add('fly');
  sprite.animations.play('fly', 24, true);
  sprite.body.velocity.y = -SPEED;
  return sprite;
}


