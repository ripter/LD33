/*global Phaser */
'use strict';

import gameState from './game-state.js';
import startState from './start-state.js';

const game = new Phaser.Game(1024, 600, Phaser.AUTO, 'content');
window.game = game;

game.state.add('start', startState);
game.state.add('game', gameState);

game.state.start('start');

