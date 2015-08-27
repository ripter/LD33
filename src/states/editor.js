/*global Phaser, game */
'use strict';

import {headerFont} from './fonts.js';

function create() {
  game.add.text(100, 100, 'You are Monster END!', headerFont);
}

function update() {
  const {ENTER} = Phaser.Keyboard;
  
  if (game.input.keyboard.isDown(ENTER)) {
    console.log('you click long time!');
  }

}

export default {
  create: create
  , update: update 
};
