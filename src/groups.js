/*global Phaser, game */
'use strict';


// create new group with physics!!
export function createGroup() {
  let group = game.add.group();
  group.enableBody = true;
  group.physicsBodyType = Phaser.Physics.ARCADE;
  return group;
}
