/*global Phaser, game */
'use strict';

import {physicsGroup} from './groups.js';
import {spawnDragon} from './dragon.js';
import {playerControl} from './player.js';
import * as Mob from './mob.js';
import {loadLevel} from './level-loader.js';
import {headerFont} from './fonts.js';

window.Mob = Mob;
import lvl1 from './level1.js';

let level;

let player;
let bullets;
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

  game.currentScore = 0;

  // load level!
  window.level = level = loadLevel(lvl1);
  window.bullets = bullets = physicsGroup();
  window.player = player = spawnDragon(500, 500);

  game.textScore = game.add.text(800, 10, 'SCORE: 0', headerFont);

  Mob.startTimedGame(level.mobs);
}

function update() {
  const {mobs, fgGroup} = level;

  playerControl(player);
  Mob.update(level.mobs);

  game.physics.arcade.collide(bullets, mobs.group, collideBulletMob);
  game.physics.arcade.collide(bullets, fgGroup, collideBulletProp);
}


function updateScore() {
  game.currentScore += 1;
  game.textScore.setText(`SCORE: ${game.currentScore}`);
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
