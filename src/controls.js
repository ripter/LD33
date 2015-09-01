/*global Phaser */
'use strict';

import {spawnFire} from './fire.js';
import {debounce} from './util.js';

const THROTTLE = 200;
const MOVE_DELAY = Phaser.Timer.HALF;
const atMoveSpeed = debounce(MOVE_DELAY);

let playerTween;
const hasDelayEnded = delay(THROTTLE);


export function update(game, sprite) {
  const pointer = game.input.activePointer;
  
  // throttle user input
  //if (!hasDelayEnded(game.time.now)) { return; }

  if (pointer.isDown) {
    // We need to limit the speed since this function is called on update
    atMoveSpeed(game.time.events, () => {
      playerTween = game.add.tween(sprite);

      // Fire when the tween completes
      playerTween.onComplete.add(() => {
        const {x, y} = sprite;

        spawnFire(x, y);
      });

      // move to the pointer
      playerTween.to(toPointer(sprite, pointer)).start();
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


function delay(speed) {
  let nextUpdate = 0;

  return (now) => {
    if (now > nextUpdate) {
      nextUpdate = now + speed;
      return true;
    }
    
    return false;
  }; 
}
