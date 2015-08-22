/*global Phaser */
'use strict';

import {createGroup} from './groups.js';
import {spawnDragon} from './dragon.js';
import {playerControl} from './player.js';
import {spawnWaypoints, spawnMobs} from './level-loader.js';

import lvl1 from './level1.js';

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
  game.load.image('knight', 'assets/knight.png', 64, 64);
  game.load.image('fire', 'assets/fire.png', 64, 64);
  game.load.image('waypoint', 'assets/waypoint.png', 24, 24);

  game.load.image('background', 'assets/levelLayoutTest.png', 1024, 525);
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.add.sprite(0,0, lvl1.background);
  
  // Setup groups!
  window.player = player = spawnDragon(500, 500);
  window.bullets = bullets = createGroup();

  window.mobs = mobs = spawnMobs(lvl1.mobs);
  window.waypoints = waypoints = spawnWaypoints(lvl1.waypoints);

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
