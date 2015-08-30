/*global Phaser, game */
'use strict';

import {preload} from './preload.js';
import {headerFont} from '../fonts.js';

import {loadLevel} from '../level-loader.js';
import {makeDragable, drawBox, makeSelect, killSelect} from '../editor.js';

import lvlData from '../level1.js';

let selectedSprite = null;
let boxGraphics = null;

function create() {
  let level = loadLevel(lvlData);
  
  boxGraphics = game.add.graphics(0, 0);
  // make the level editable
  level.fgGroup.forEach(makeDragable, this, true, {
    onInputDown: function(sprite) {
      // .onInputDown()
      // set it as the new selected sprite
      window.selectedSprite = selectedSprite = sprite;

    }
    , onInputUp: function(sprite) {
      //selectedSprite = null
    }
  });
}

function update() {
  const {ENTER} = Phaser.Keyboard;
  
  if (game.input.keyboard.isDown(ENTER)) {
    console.log('you click long time!');
  }
  
  if (selectedSprite) {
    drawBox(boxGraphics, selectedSprite);
    //renderSelectedBox();
  }

}

export default {
  create: create
  , update: update 
  , preload: preload
};


