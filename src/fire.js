/*global Phaser, game, bullets */
'use strict';

import {OTHER} from './constants.js';
const SPEED = 300;
const OFFSET_Y = 0;
const OFFSET_X = 29;

// debug stats
window.bulletCount = 0;

export class Fire extends Phaser.Sprite {
  constructor(x, y, group) {
    const {game} = group;
    super(game, x + OFFSET_X, y + OFFSET_Y, OTHER.FIRE); 
    // We need to add to the group so we get physics .body
    group.add(this);

    this.animations.add('fly');
    this.animations.play('fly', 24, true);
    this.body.velocity.y = -SPEED;
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;

    // debug stats
    window.bulletCount++;
  }
  
  reset(x, y) {
    super.reset(x + OFFSET_X, y + OFFSET_Y);
    this.body.velocity.y = -SPEED;
  }
};

// totally not a constructor
// constructors use NEW, we use SPAWN. Totally different! :)
export function spawnFire(x, y, group) {
  let sprite = group.create(x + OFFSET_X, y + OFFSET_Y, 'fire');

  sprite.animations.add('fly');
  sprite.animations.play('fly', 24, true);
  sprite.body.velocity.y = -SPEED;
  return sprite;
}


