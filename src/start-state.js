/*global Phaser, game */
'use strict';

import {headerFont, sceneFont} from './fonts.js';

//
// Lifecycle
//
function preload() {
  game.load.image('carnie', 'assets/carnieDragon-105x158.png', 105, 158);
  game.load.image('stuffedPrincess', 'assets/stuffedPrincess-89x101.png', 89, 101);
}

function create() {
  // place somet nice things
  game.add.image(550, 100, 'stuffedPrincess');
  game.add.image(450, 100, 'stuffedPrincess');
  game.add.image(350, 100, 'stuffedPrincess');
  game.add.image(100, 217, 'carnie');
  
  // instructions
  game.add.text(10, 10, 'Dragon Carnival:', sceneFont);
  game.add.text(40, 45, 'Shoot the knights to win the stuffed princess doll.', headerFont);
  game.add.text(40, 65, 'If a human reaches your balloon, game over.', headerFont);

  game.add.text(400, 257, 'Tap to start!', sceneFont);

}

function update() {
  const {SPACEBAR} = Phaser.Keyboard;
  
  // Tap to Start
  if (game.input.activePointer.isDown) {
    game.state.start('game', true, false, 'iphone-map');
  }

}
export default {
  preload: preload
  , create: create
  , update: update 
};
