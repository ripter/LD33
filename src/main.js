/*global Phaser */
'use strict';
import R from 'ramda';

import {createGroup} from './groups.js';
import {spawnDragon} from './dragon.js';
import {playerControl} from './player.js';

let player;
let mobs;
let bullets;
let waypoints;
let props;

const game = new Phaser.Game(
  1024
  , 600
  , Phaser.AUTO
  , 'content'
  , { 
    preload: preload
    , create: create
    , update: update 
});
window.game = game;

function preload() {
  game.load.image('dragon', 'assets/dragon.png', 128, 128);
  game.load.image('king', 'assets/king.png', 64, 64);
  game.load.image('fire', 'assets/fire.png', 64, 64);
  game.load.image('background', 'assets/levelLayoutTest.png', 1024, 525);
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  
  // Setup groups!
  window.player = player = spawnDragon(500, 500);
  window.mobs = mobs = createGroup();
  window.bullets = bullets = createGroup();
  window.waypoints = waypoints = createGroup();
  window.props = props = createGroup();
}

function update() {
  game.physics.arcade.collide(bullets, mobs, collideBullet);
  game.physics.arcade.collide(bullets, props, collideBullet);
  game.physics.arcade.collide(mobs, waypoints, collideWaypoint);
  
  playerControl(player);  
}

function collideBullet(one, two) {
  console.log('collideBullet', one, two);
}

function collideWaypoint(one, two) {
  console.log('collideWaypoint', one, two);
}
