/*global Phaser */
'use strict';

import {createGroup} from './groups.js';
import {spawnDragon} from './dragon.js';
import {playerControl} from './player.js';
import * as Mob from './mob.js';
import {spawnWaypoints, spawnProps, spawnSprites} from './level-loader.js';

window.Mob = Mob;
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

  game.load.image('tree', 'assets/tree.png', 64, 64);
  game.load.image('wall', 'assets/wall.png', 64, 64);
  game.load.image('shrub', 'assets/shrub.png', 64, 64);

  game.load.image('background', 'assets/levelLayoutTest.png', 1024, 525);
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.add.sprite(0,0, lvl1.background);
  
  // Setup groups!
  window.player = player = spawnDragon(500, 500);
  window.bullets = bullets = createGroup();

  window.waypoints = waypoints = spawnWaypoints(lvl1.waypoints);
  //window.mobs = mobs = spawnSprites(lvl1.mobs);
  window.mobs = mobs = spawnSprites(lvl1.mobs);
  window.props = props = spawnProps(lvl1.props);
 
  // these mobs follow these waypoints
  Mob.run(mobs, waypoints);

  // start a mob moving
  //Mob.moveToPoint(mobs.children[0], waypoints.children[2]);
}

function update() {
  game.physics.arcade.collide(bullets, mobs, collideBulletMob);
  game.physics.arcade.collide(bullets, props, collideBulletProp);
  game.physics.arcade.collide(mobs, waypoints, collideWaypoint);
  
  playerControl(player);  
}

function collideBulletProp(bullet, prop) {
  // kill the bullet
  bullet.kill();
}

function collideBulletMob(bullet, mob) {
  console.log('collideBulletMob', bullet, mob);
  bullet.kill();
  mob.kill();
}

function collideWaypoint(one, two) {
  console.log('collideWaypoint', one, two);
  
  // move to the next one!
}
