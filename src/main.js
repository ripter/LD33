/*global Phaser */
'use strict';

import gameState from './game-state.js';

const game = new Phaser.Game(
  1024
  , 600
  , Phaser.AUTO
  , 'content'
  , gameState);
window.game = game;

