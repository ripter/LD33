/*global Phaser */
import R from 'ramda';

import Dragon from './dragon.js';
import Mob from './mob.js';
import Fire from './fire.js';

let player;
let mobs;
let mob;
let fire;

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

  player = game.add.sprite(500, 500, 'dragon');
  mob = game.add.sprite(300, 100, 'king');
  fire = game.add.sprite(300, 500, 'fire');
  
  game.physics.enable([player, fire], Phaser.Physics.ARCADE); 
  fire.body.velocity.y = -Phaser.Timer.HALF;
  
  mobs = game.add.group();
  mobs.enableBody = true;
  mobs.physicsBodyType = Phaser.Physics.ARCADE;
  mobs.add(mob);
}

function update() {
  
  game.physics.arcade.collide(fire, mobs, collide, null, this);

}

function collide(one, two) {
  console.log('collide', arguments);
}
