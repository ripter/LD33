/*global Phaser, game */
'use strict';

const SPEED = Phaser.Timer.SECOND;

export function moveToPoint(sprite, waypoint) {
  let {x, y} = waypoint;

  game.physics.arcade.accelerateToXY(sprite, x, y, SPEED);
}

