/*global Phaser, game */
'use strict';

export function preload() {
  // Player
  game.load.image('dragon', 'assets/dragon2.png', 128, 128);
  game.load.spritesheet('fire', 'assets/fire_4frame_20x40.png', 20, 40);
  game.load.image('balloon', 'assets/balloon.png', 64, 64);

  // Mobs  
  game.load.image('king', 'assets/king.png', 64, 64);
  game.load.image('knight', 'assets/knight.png', 64, 64);
  game.load.image('horse', 'assets/knightOnHorse.png', 64, 64);
  
  // Props
  game.load.image('wall', 'assets/wall.png', 64, 64);
  game.load.image('tower', 'assets/tower.png', 64, 64);
  game.load.spritesheet('tree', 'assets/tree_spritesheet.png', 64, 64);
  game.load.spritesheet('shrub', 'assets/shrub_spritesheet.png', 64, 64);

  // Misc
  game.load.image('carnie', 'assets/carnieDragon.png', 210, 317);
  game.load.image('stuffedPrincess', 'assets/stuffedPrincess.png', 178, 203);
  game.load.image('background', 'assets/levelLayoutTest.png', 1024, 525);
  
  // Sound
  game.load.audio('hit', 'assets/hit.wav');
  game.load.audio('score', 'assets/shoot.wav');
}
