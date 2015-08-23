/*global Phaser, game */
'use strict';

import {headerFont} from './fonts.js';

//
// Lifecycle
//
function preload() {
  game.load.image('carnie', 'assets/carnieDragon.png', 210, 317);
  game.load.image('stuffedPrincess', 'assets/stuffedPrincess.png', 178, 203);
}

function create() {
  // place somet nice things
  game.add.image(800, 100, 'stuffedPrincess');
  game.add.image(100, 300, 'carnie');
  
  // instructions
  game.add.text(100, 100, 'You are dragon.', headerFont);
  game.add.text(100, 200, 'Win dragon lady friend a stuffed princess.', headerFont);
  game.add.text(400, 500, 'Press Space to try your luck!', headerFont);
  
}

function update() {
  const {SPACEBAR} = Phaser.Keyboard;
  
  if (game.input.keyboard.isDown(SPACEBAR)) {
    game.rose = 'a puppy';
    game.state.start('game');
  }

}
export default {
  preload: preload
  , create: create
  , update: update 
};
