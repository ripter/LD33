/*global Phaser */
'use strict';

import './polyfill.js';

import gameState from './states/game.js';
import start from './states/start.js';
import end from './states/end.js';
import editor from './states/editor.js';

const game = new Phaser.Game(1136, 640, Phaser.AUTO, 'content');
window.game = game;

game.state.add('start', start);
game.state.add('game', gameState);
game.state.add('end', end);
game.state.add('editor', editor);

// prod
game.state.start('start');
// dev
//game.state.start('game');
//game.state.start('editor');
