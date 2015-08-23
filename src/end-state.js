/*global Phaser, game */
'use strict';

import {headerFont} from './fonts.js';
import {updateScore} from './game-state.js';

//
// Lifecycle
//
function preload() {
	//game.currentScore = JSON.parse(localStorage.getItem('current'));
	// game.storedScore = JSON.parse(localStorage.getItem('scores')); 
}

function create() {
  game.add.text(100, 100, 'You are Monster END!', headerFont);
  game.add.text(100, 150, 'Press [ENTER] NOW!!!', headerFont);
  game.add.text(100, 200, 'Your score: ' + game.currentScore, headerFont);
}

function update() {
  const {ENTER} = Phaser.Keyboard;
  
  if (game.input.keyboard.isDown(ENTER)) {
    game.state.start('game', true);
  }

}


// function scoreList() {
// 	if(game.storedScore === null){
		
// 		game.storedScore = []
// 	}

// 	game.storedScore.unshift(game.currentScore);

//   if (game.storedScore.legth > 5) {
//     game.storedScore.pop();
//   }
//   localStorage.setItem('scores', game.storedScore);
// }


export default {
  preload: preload
  , create: create
  , update: update 
};
