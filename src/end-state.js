/*global Phaser, game */
'use strict';

import {headerFont} from './fonts.js';

//
// Lifecycle
//
function preload() {

}

function create() {
  game.add.text(100, 100, 'You are Monster!', headerFont);
  game.add.text(100, 300, 'Press Space NOW!!!', headerFont);
}

function update() {
  const {SPACEBAR} = Phaser.Keyboard;
  
  if (game.input.keyboard.isDown(SPACEBAR)) {
    game.state.start('game');
  }

}
export default {
  preload: preload
  , create: create
  , update: update 
};
