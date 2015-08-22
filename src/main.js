/*global Phaser */
import R from 'ramda';

import Dragon from './dragon.js';
import Mob from './mob.js';

let player;
let mobs;
let mob;

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
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  player = new Dragon(game, 500, 500);
  mob = new Mob(game, 300, 100, 'king');
  
  // mobs = game.add.group();
  // mobs.enableBody = true;
  // mobs.physicsBodyType = Phaser.Physics.ARCADE;
  // //game.physics.enable(mobs, Phaser.Physics.ARCADE);
  // mobs.add((new Mob(game, 300, 100, 'king')).sprite);
}

function update() {
  player.update();
  
  if (player.bullet) {
    console.log('test bullet');
    game.physics.arcade.overlap(player.bullet, mob, collide);
  }
  //mobs.update();
  // mobs.forEach(function(mob) {
  //   mob.update();
  // });
}

function collide() {
  debugger;
}
