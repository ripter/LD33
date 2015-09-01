/*global Phaser, game */

import Fire from './fire.js';

export function spawnDragon(x, y) {
  let sprite = game.add.sprite(x, y, 'dragon');
  game.physics.enable(sprite, Phaser.Physics.ARCADE);
  
  sprite.health = 3;
  // Move with tweens, not physics
  sprite.body.moves = false;
  return sprite;
}
