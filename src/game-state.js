/*global Phaser, game */
'use strict';

import {physicsGroup} from './groups.js';
import {spawnDragon} from './dragon.js';
import * as Props from './foreground.js';
import * as Mob from './mob.js';
import * as Controls from './controls.js';
import {loadLevel, loadTiledMap} from './level-loader.js';
import {headerFont, infoFont} from './fonts.js';

window.Mob = Mob;

let level;
let levelFile;
let map;

let player;
let bullets;
let balloons;
let sfx;

function init(lvlFile) {
  window.levelFile = levelFile = lvlFile;
}

function preload() {
  game.load.image('dragon', 'assets/dragon-77x91.png', 77, 91);
  game.load.image('king', 'assets/king.png', 64, 64);
  game.load.image('knight', 'assets/knight.png', 64, 64);
  game.load.image('horse', 'assets/knightOnHorse.png', 64, 64);
  game.load.image('wall', 'assets/wall.png', 64, 64);
  game.load.image('tower', 'assets/tower.png', 64, 64);

  game.load.spritesheet('tree', 'assets/tree_spritesheet.png', 64, 64);
  game.load.spritesheet('shrub', 'assets/shrub_spritesheet.png', 64, 64);
  game.load.spritesheet('fire', 'assets/fire_4frame_20x40.png', 20, 40);

  game.load.image('balloon', 'assets/balloon.png', 64, 64);
  
  // backgrounds
  game.load.image('background', 'assets/levelLayoutTest.png', 1024, 525);
  game.load.image('bg-iphone', 'assets/bg-iphone.png', 667, 375);
  game.load.image('curtains', 'assets/curtains.png', 667, 375);
  
  game.load.audio('hit', 'assets/hit.wav');
  game.load.audio('score', 'assets/shoot.wav');
  
  // MAP
  game.load.tilemap('iphone-map', 'assets/maps/iphone.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('pathSpriteSheet', 'assets/paths/pathSpriteSheet.png');
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.currentScore = 0;

  // test loading tile map
  let map = loadTiledMap(game, 'iphone-map');
  window.map = map;
  

  window.level = level = loadLevel(levelFile);
  // load level!
  window.bullets = bullets = physicsGroup();

  // Score!
  game.textScore = game.add.text(800, 10, 'SCORE: 0', headerFont);
  
  // How to Play
  game.add.text(50, 540, 'ARROW KEYS: <- move ->', infoFont);
  game.add.text(50, 560, 'SPACEBAR: [Fire]', infoFont);
  
  // it's curtians for you!
  window.curtains = game.add.image(0, 0, 'curtains');

  // player on top of everything
  window.player = player = spawnDragon(100, 294);

  Mob.startTimedGame(level.mobGroup);
  


  
  // sounds
  window.sfx = sfx = {
    hit: game.add.audio('hit')
    , score: game.add.audio('score')
  };
}

function update() {
  const {mobGroup, fgGroup, balloons} = level;
  const {ESC} = Phaser.Keyboard;

  Controls.update(game, player);

  game.physics.arcade.overlap(bullets, mobGroup, collideBulletMob);
  game.physics.arcade.collide(bullets, fgGroup, collideBulletProp);
  game.physics.arcade.collide(mobGroup, balloons, collideBalloon); 
  
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

  const {mobGroup} = level;
  const points = mob.data.points || 1;

  bullet.kill();
  mob.kill();
  updateScore(points);
  sfx.score.play();

  // Game Over check
  if (mobGroup.countLiving() === 0) {
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
  preload: preload
  , create: create
  , update: update
  , init: init
};

