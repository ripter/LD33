/*global Phaser, game */
'use strict';

import {preload} from './preload.js';
import {physicsGroup} from '../groups.js';
import {spawnDragon} from '../dragon.js';
import {playerControl} from '../player.js';
import * as Props from '../foreground.js';
import * as Mob from '../mob.js';
import {loadLevel} from '../level-loader.js';
import {headerFont, infoFont} from '../fonts.js';

window.Mob = Mob;
import lvl1 from '../level1.js';

let level;

let player;
let bullets;
let balloons;
let sfx;

function create() {
  const levelData = lvl1;
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.currentScore = 0;

  // load level!
  window.level = level = loadLevel(levelData);
    
  // Should be in level state:
  window.bullets = bullets = physicsGroup();
  // player on top of everything
  window.player = player = spawnDragon(500, 500);

    
  // UI
  // Score!
  game.textScore = game.add.text(800, 10, 'SCORE: 0', headerFont);
  // How to Play
  game.add.text(50, 540, 'ARROW KEYS: <- move ->', infoFont);
  game.add.text(50, 560, 'SPACEBAR: [Fire]', infoFont);
  

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


function updateScore(points) {
  game.currentScore += points;
  game.textScore.setText(`SCORE: ${game.currentScore}`);
}

// Props/foreground are indistructable
function collideBulletProp(bullet, prop) {
  // Bullets only collide once
  if (!bullet.alive) { return; }

  // kill the bullet
  bullet.kill();
  sfx.hit.play();
  
  Props.onHit(prop);
}

function collideBulletMob(bullet, mob) {
  // Bullets only collide once
  if (!bullet.alive) { return; }

  const {mobs} = level;
  const points = mob.data.points || 1;

  bullet.kill();
  mob.kill();
  updateScore(points);
  sfx.score.play();

  // Game Over check
  if (Mob.mobsLeft(mobs) === 0) {
    level.state = 'win';
    game.state.start('end');
  }
}

function collideBalloon(mob, balloon) {
  balloon.kill();
  level.state = 'lost';
  game.state.start('end');
}


export default {
  create: create
  , update: update
  , preload: preload
};

