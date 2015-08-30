/*global Phaser, game, $ */
'use strict';

import {preload} from './preload.js';
import {headerFont} from '../fonts.js';

import {loadLevel} from '../level-loader.js';
import {makeDragable, drawBox} from '../editor.js';
import * as FG from '../foreground.js';
import * as ui from '../editor/ui.js';

import {addBlocker} from '../editor/actions.js';

import lvlData from '../level1.js';

let level;
let selectedSprite = null;

function create() {
  level = loadLevel(lvlData);
  
  ui.createUI(level);
}

function update() {
  const {A, ENTER} = Phaser.Keyboard;
  let sprite;
  
  //if (game.input.keyboard.isDown(ENTER)) {
  if (game.input.keyboard.isDown(ENTER)) {
    console.log('you click long time!');
  }
  
  ui.update();
}


export default {
  create: create
  , update: update 
  , preload: preload
};


