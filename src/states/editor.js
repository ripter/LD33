/*global Phaser, game, $ */
'use strict';

import {preload} from './preload.js';
import {headerFont} from '../fonts.js';

import {loadLevel} from '../level-loader.js';
import {makeDragable, drawBox} from '../editor.js';
import * as FG from '../foreground.js';

import * as ui from '../editor/ui.js';

import lvlData from '../level1.js';

const ADD_SPEED = Phaser.Timer.HALF;

let level;
let selectedSprite = null;
let boxGraphics = null;
let canAdd = true;

function create() {
  ui.createUI();

  level = loadLevel(lvlData);
  
  boxGraphics = game.add.graphics(0, 0);
  // make the level editable
  level.fgGroup.forEach(makeDragable, this, true, {
    onInputDown: setSelected
  });
}

function update() {
  const {A, ENTER} = Phaser.Keyboard;
  let sprite;
  
  //if (game.input.keyboard.isDown(ENTER)) {
  if (game.input.keyboard.isDown(ENTER)) {
    console.log('you click long time!');
  }
  
  // Add prop
  if (canAdd && game.input.keyboard.isDown(A)) {
    canAdd = false;
    sprite = FG.spawn(level.fgGroup, {x:100, y:100, spriteKey: 'tower'});
    sprite = makeDragable(sprite, {onInputDown: setSelected});
    selectedSprite = sprite;

    // Delay the firing
    game.time.events.add(ADD_SPEED, () => {
      canAdd = true;
    });
  }
  
  if (selectedSprite) {
    drawBox(boxGraphics, selectedSprite);
    //renderSelectedBox();
  }
}

function setSelected(sprite) {
  return window.selectedSprite = selectedSprite = sprite;
}


export default {
  create: create
  , update: update 
  , preload: preload
};

