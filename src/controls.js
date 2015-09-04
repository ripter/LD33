/*global Phaser */
'use strict';

import {spawnFire} from './fire.js';
import {debounce} from './util.js';

const MOVE_DELAY = 300;
const FIRE_DELAY = 500;
const atMoveSpeed = debounce(MOVE_DELAY);
const atFireSpeed = debounce(FIRE_DELAY);


export function update(game, sprite) {
  const pointer = game.input.activePointer;
  let playerTween;
  
  if (pointer.isDown) {
    // We need to limit the speed since this function is called on update
    atMoveSpeed(game.time.events, () => {
      playerTween = game.add.tween(sprite);

      // Fire when the tween completes
      playerTween.onComplete.add(() => {
        const {x, y} = sprite;

        // Limit the fire speed on top of the movement speed.
        atFireSpeed(game.time.events, () => { 
          spawnFire(x, y);
        });
      });

      // move to the pointer
      playerTween.to(toPointer(sprite, pointer), MOVE_DELAY).start();
    });
  }
}

// Returns an object to use with tween.to
function toPointer(sprite, pointer) {
  const {width} = sprite;
  let {x} = pointer;
  
  // Adjust for sprite size
  x -= width/2;
  
  return {
    x: x
  };
}
