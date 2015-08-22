/*global Phaser, game */
'use strict';

const SPEED = 100; //Phaser.Timer.MINUTE * 4;

export function moveToPoint(sprite, waypoint) {
  let {x, y} = waypoint;

  console.log('waypoint', x, y);
  game.physics.arcade.accelerateToXY(sprite, x, y, SPEED);
}
