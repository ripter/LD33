/*global Phaser */
import R from 'ramda';

import Dragon from './dragon.js';
import Mob from './mob.js';

let player;
let mobs = [];

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

function preload() {
  game.load.image('dragon', 'assets/dragon.png', 128, 128);
  game.load.image('king', 'assets/king.png', 64, 64);
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  player = new Dragon(game, 100, 100);
  mobs.push(new Mob(game, 300, 100, 'king'));
}

function update() {
  player.update();
  
  mobs.forEach(function(mob) {
    mob.update();
  });
}
