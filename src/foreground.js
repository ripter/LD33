/*global Phaser, game */
'use strict';

export function spawn(group, data) {
  const {x, y, spriteKey} = data;
  let sprite = group.create(x, y, spriteKey);  

  sprite.anchor = {x: .5, y: 1};
  sprite.data = data;
  sprite.body.immovable = true;
  
  return sprite;
}
