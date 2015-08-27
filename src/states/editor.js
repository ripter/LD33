/*global Phaser, game */
'use strict';

import {preload} from './preload.js';
import {headerFont} from '../fonts.js';

import {loadLevel, makeEditable} from '../level-loader.js';

import lvlData from '../level1.js';

function create() {
  game.add.text(100, 100, 'You are Monster END!', headerFont);
  
  let level = loadLevel(lvlData);
  // make the level editable
  level = makeEditable(level);
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
  , preload: preload
};
