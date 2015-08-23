/*global Phaser, game */
'use strict';

import {createGroup} from './groups.js';
import {spawnDragon} from './dragon.js';
import {playerControl} from './player.js';
import * as Mob from './mob.js';
import {spawnWaypoints, spawnProps, spawnMobs, spawnSprites} from './level-loader.js';

window.Mob = Mob;
import lvl1 from './level1.js';

let player;
let mobs;
let bullets;
let waypoints;
let props;
let balloons;

function preload() {
  game.load.image('dragon', 'assets/dragon.png', 128, 128);
  game.load.image('king', 'assets/king.png', 64, 64);
  game.load.image('knight', 'assets/knight.png', 64, 64);
  //game.load.image('waypoint', 'assets/waypoint_20x20.png', 24, 24);
  game.load.image('waypoint', 'assets/waypoint_10x10.png', 10, 10);

  game.load.image('tree', 'assets/tree.png', 64, 64);
  game.load.image('wall', 'assets/wall.png', 64, 64);
  game.load.image('shrub', 'assets/shrub.png', 64, 64);
  game.load.image('balloon', 'assets/balloon.png', 64, 64);
  
  game.load.spritesheet('fire', 'assets/fire_4frame_20x40.png', 20, 40);

  game.load.image('background', 'assets/levelLayoutTest.png', 1024, 525);
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.add.sprite(0,0, lvl1.background);


  game.currentScore = 0;
  game.storedScore = [];
  game.scoreString = 'SCORE: ';
  game.text = game.add.text(700, 30, game.scoreString + game.currentScore, {font: '24px Arial'});
  
  // Setup groups!
  window.bullets = bullets = createGroup();
  window.player = player = spawnDragon(500, 500);

  window.waypoints = waypoints = spawnWaypoints(lvl1.waypoints);
  window.mobs = mobs = spawnMobs(lvl1.mobs);
  window.props = props = spawnProps(lvl1.props);
 
  // these mobs follow these waypoints
  Mob.run(mobs, waypoints);

  // start a mob moving
  //Mob.moveToPoint(mobs.children[0], waypoints.children[2]);
}

function updateScore() {

  game.currentScore++;
  console.log('scores', game.currentScore);
  game.text.text = game.scoreString + game.currentScore;
  localStorage.setItem('current', game.currentScore);
}

function update() {
  game.physics.arcade.collide(bullets, mobs, collideBulletMob);
  game.physics.arcade.collide(bullets, props, collideBulletProp);

  playerControl(player);
  Mob.checkWaypoints(mobs, waypoints);
}

function collideBulletProp(bullet, prop) {
  // kill the bullet
  bullet.kill();
}

function collideBulletMob(bullet, mob) {
  updateScore();
  bullet.kill();
  mob.kill();
}

export default {
  preload: preload
  , create: create
  , update: update 
};
