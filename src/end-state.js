/*global Phaser, game */
'use strict';

import {headerFont} from './fonts.js';
import {updateScore} from './game-state.js';

//
// Lifecycle
//
function preload() {
	debugger;
	console.log('state', game)
}

function create() {
  game.add.text(100, 100, 'You are Monster END!', headerFont);
  game.add.text(100, 150, 'Press Space NOW!!!', headerFont);
  game.add.text(100, 200, 'Your score: ', headerFont);
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
