/*global Phaser */
'use strict';

import './polyfill.js';

import gameState from './states/game.js';
import startState from './states/start.js';
import endState from './states/end.js';

const game = new Phaser.Game(1136, 640, Phaser.AUTO, 'content');
window.game = game;

game.state.add('start', startState);
game.state.add('game', gameState);
game.state.add('end', endState);

// prod
game.state.start('start');
// dev
//game.state.start('game');
