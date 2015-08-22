/*global Phaser */

import Dragon from './dragon.js';

let player;

const game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('dragon', 'assets/dragon.png', 128, 128);
}

function create() {

  player = new Dragon(game, 100, 100);
}

function update() {
  player.update();
}
