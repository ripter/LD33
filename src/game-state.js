/*global Phaser, game */
'use strict';

import {physicsGroup} from './groups.js';
import {spawnDragon} from './dragon.js';
import {playerControl} from './player.js';
import * as Mob from './mob.js';
import {loadLevel} from './level-loader.js';
import {headerFont, infoFont} from './fonts.js';

window.Mob = Mob;
import lvl1 from './level1.js';

let level;

let player;
let bullets;
let balloons;
let sfx;

function preload() {
  game.load.image('dragon', 'assets/dragon2.png', 128, 128);
  game.load.image('king', 'assets/king.png', 64, 64);
  game.load.image('knight', 'assets/knight.png', 64, 64);
  game.load.image('horse', 'assets/knightOnHorse.png', 64, 64);
  //game.load.image('waypoint', 'assets/waypoint_20x20.png', 24, 24);
  game.load.image('waypoint', 'assets/waypoint_10x10.png', 10, 10);

  game.load.image('tree', 'assets/tree.png', 64, 64);
  game.load.image('wall', 'assets/wall.png', 64, 64);
  game.load.image('shrub', 'assets/shrub.png', 64, 64);
  game.load.image('balloon', 'assets/balloon.png', 64, 64);

  game.load.spritesheet('fire', 'assets/fire_4frame_20x40.png', 20, 40);
  game.load.image('background', 'assets/levelLayoutTest.png', 1024, 525);
  
  game.load.audio('hit', 'assets/hit.wav');
  game.load.audio('score', 'assets/shoot.wav');
}

function create() {
  const levelData = lvl1;
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.currentScore = 0;

  // load level!
  window.level = level = loadLevel(levelData);
  window.bullets = bullets = physicsGroup();

  // Score!
  game.textScore = game.add.text(800, 10, 'SCORE: 0', headerFont);
  
  // How to Play
  game.add.text(50, 540, 'ARROW KEYS: <- move ->', infoFont);
  game.add.text(50, 560, 'SPACEBAR: [Fire]', infoFont);
  
  // player on top of everything
  window.player = player = spawnDragon(500, 500);

  Mob.startTimedGame(level.mobs);
  
  // sounds
  window.sfx = sfx = {
    hit: game.add.audio('hit')
    , score: game.add.audio('score')
  };
}

function update() {
  const {mobs, fgGroup, balloons} = level;
  const {ESC} = Phaser.Keyboard;

  playerControl(player);
  Mob.update(mobs);

  game.physics.arcade.overlap(bullets, mobs.group, collideBulletMob);
  //game.physics.arcade.collide(bullets, mobs.group, collideBulletMob);
  game.physics.arcade.collide(bullets, fgGroup, collideBulletProp);
  game.physics.arcade.collide(mobs.group, balloons, collideBalloon); 
  

  // debug
  if (game.input.keyboard.isDown(ESC)) {
    sfx.hit.play();  
  }
}


function updateScore() {
  game.currentScore += 1;
  game.textScore.setText(`SCORE: ${game.currentScore}`);
}

// Props/foreground are indistructable
function collideBulletProp(bullet, prop) {
  // kill the bullet
  bullet.kill();
  sfx.hit.play();
}

function collideBulletMob(bullet, mob) {
  const {mobs} = level;

  // Bullets only collide once
  if (!bullet.alive) { return; }
  bullet.kill();
  mob.kill();
  updateScore();
  sfx.score.play();

  // Game Over check
  if (Mob.mobsLeft(mobs) === 0) {
    game.state.start('end');
  }
}

function collideBalloon(mob, balloon) {
  balloon.kill();
  game.state.start('end');
}


export default {
  preload: preload
  , create: create
  , update: update
};

