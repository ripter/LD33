/*global Phaser */
'use strict';
import R from 'ramda';

import {playerControl} from './player.js';
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

  //player = game.add.sprite(500, 500, 'dragon');
  player = new Dragon(game, 500, 500);
  fire = new Fire(game, 300, 500);
  mob = new Mob(game, 300, 100, 'king');

  //mob = game.add.sprite(300, 100, 'king');
  //fire = game.add.sprite(300, 500, 'fire');
  
  //game.physics.enable(fire, Phaser.Physics.ARCADE); 
  //fire.body.velocity.y = -Phaser.Timer.HALF;
  
  window.mobs = mobs = game.add.group();
  mobs.enableBody = true;
  mobs.physicsBodyType = Phaser.Physics.ARCADE;
  mobs.add(mob.sprite);
}

function update() {
  player.update();

  mobs.forEach((mobSprite) => {
    mobSprite.host.update();
  });

  //playerControl(game, player.sprite);
  game.physics.arcade.collide(fire.sprite, mobs, collide, null, this);

}

function collide(one, two) {
  //console.log('collide', arguments);
}
