/*global Phaser, game */
'use strict';

import {preload} from './preload.js';
import {headerFont} from '../fonts.js';

import lvl1 from '../levels/level1.js';

//
// Lifecycle
//
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
  const {SPACEBAR, E} = Phaser.Keyboard;
  
  // make it global so the other states can use it.
  window.levelFile = lvl1;
  
  if (game.input.keyboard.isDown(SPACEBAR)) {
    game.state.start('game');
  }
  else if (game.input.keyboard.isDown(E)) {
    game.state.start('editor');
  }
  

}
export default {
  create: create
  , update: update 
  , preload: preload
};
