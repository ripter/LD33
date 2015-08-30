/*global Phaser, game */
'use strict';

export const TYPES = {
  WALL: 'FG_TYPES_WALL'
  , TOWER: 'FG_TYPES_TOWER'
  , TREE: 'FG_TYPES_TREE'
  , SHRUB: 'FG_TYPES_SHRUB' 
};

export function spawn(group, data) {
  const {x, y, spriteKey} = data;
  let sprite = group.create(x, y, spriteKey);  

  sprite.anchor = {x: .5, y: 1};
  sprite.data = data;
  sprite.body.immovable = true;
  
  switch (spriteKey) {
    case 'shrub':
      sprite = toShrub(sprite);
      break;
    case 'tree':
      sprite = toTree(sprite);
      break;
  }
  
  return sprite;
}

function toShrub(sprite) {
  sprite.health = 2;
  // set the animations
  sprite.animations.add('norm', [0]);
  sprite.animations.add('burn', [1]);
  sprite.animations.add('dead', [2]);
  sprite.animations.play('norm', 24, true);
  
  return sprite;
}

function toTree(sprite) {
  sprite.health = 3;
  // set the animations
  sprite.animations.add('norm', [0]);
  sprite.animations.add('burn', [1]);
  sprite.animations.add('dead', [2]);
  sprite.animations.play('norm', 24, true);
  
  return sprite;
}

export function onHit(sprite) {
  const {key} = sprite;
  
  switch(key) {
    case 'shrub':
      sprite = hitShrub(sprite);
      break;
    case 'tree':
      sprite = hitTree(sprite);
      break;
  }

  return sprite;
}

function hitShrub(sprite) {
  const health = sprite.health -1;
  
  if (health === 1) {
    sprite.animations.play('dead');
  }
  
  if (health === 0) {
    sprite.kill();
  }
  
  sprite.health = health;
  return sprite;
}

function hitTree(sprite) {
  const health = sprite.health -1;
  
  if (health === 2) {
    sprite.animations.play('burn');
  }

  if (health === 1) {
    sprite.animations.play('dead');
  }
  
  if (health === 0) {
    sprite.kill();
  }
  
  sprite.health = health;
  return sprite;
}
