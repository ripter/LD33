/*global Phaser, game */
'use strict';

import {preload} from './preload.js';
import {headerFont} from '../fonts.js';
import {updateScore} from './game.js';

//
// Lifecycle
//
function create() {
  addGameOver();
  //game.add.text(100, 100, 'You are Monster END!', headerFont);
  //game.add.text(100, 150, 'Press [ENTER] NOW!!!', headerFont);
  game.add.text(100, 200, 'Your score: ' + game.currentScore, headerFont);

  game.add.text(100, 150, 'Press [enter] to play again', headerFont);
}

function update() {
  const {ENTER} = Phaser.Keyboard;
  
  if (game.input.keyboard.isDown(ENTER)) {
    game.state.start('game', true);
  }

}


function addGameOver() {
  const score = game.currentScore;
  const didWin = level.state === 'win';
  
  if (didWin) {
    game.add.text(100, 100, 'You WIN!', headerFont);
    game.add.image(500, 100, 'stuffedPrincess');
  }
  else {
    game.add.text(100, 100, 'You LOST!', headerFont);
    game.add.image(100, 300, 'carnie');
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
  create: create
  , update: update 
  , preload: preload
};
