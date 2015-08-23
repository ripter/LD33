/*global Phaser, game */
'use strict';

import {headerFont} from './fonts.js';
import {updateScore} from './game-state.js';

//
// Lifecycle
//
function preload() {
	game.currentScore = JSON.parse(localStorage.getItem('current'));
	game.storedScore = JSON.parse(localStorage.getItem('scores')); 
}

function create() {
  game.add.text(100, 100, 'You are Monster END!', headerFont);
  game.add.text(100, 150, 'Press Space NOW!!!', headerFont);
  game.add.text(100, 200, 'Your score: ' + game.currentScore, headerFont);
  scoreList();
}

function update() {
  const {SPACEBAR} = Phaser.Keyboard;
  
  if (game.input.keyboard.isDown(SPACEBAR)) {
    game.state.start('game');
  }

}


function scoreList() {
	if(game.storedScore === null){
console.log('gameScorer', game.storedScore)
		game.storedScore = []
	}

	game.storedScore.unshift(game.currentScore);

  if (game.storedScore.legth > 5) {
    game.storedScore.pop();
  }
  localStorage.setItem('scores', game.storedScore);
console.log('scores', game.storedScore)
}


export default {
  preload: preload
  , create: create
  , update: update 
};
