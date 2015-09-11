/*global Phaser */
'use strict';

import {Fire} from './fire.js';
import {debounce, getFirst} from './util.js';

const MOVE_DELAY = 300;
const FIRE_DELAY = 500;
const atMoveSpeed = debounce(MOVE_DELAY);
const atFireSpeed = debounce(FIRE_DELAY);


export function update(game, sprite, map) {
  const {bulletGroup, tapZoneList} = map;
  const pointer = game.input.activePointer;

  if (!pointer.isDown) { return; }

  const activeZone = tapZoneList.find((zone) => {
    return Phaser.Rectangle.containsPoint(zone, pointer);
  });  
  
  if (!activeZone) { return; }

  atFireSpeed(game.time.events, () => {
    const {x, y} = activeZone.fire;

    fireBullet(x, y, bulletGroup);
    sprite.x = x;
  });
}

// Clike to move and fire
export function updateTapAndMove(game, sprite, map) {
  const {bulletGroup} = map;
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
          fireBullet(x, y, bulletGroup);
        });
      });

      // move to the pointer
      playerTween.to(toPointer(sprite, pointer), MOVE_DELAY).start();
    });
  }
}


function fireBullet(x, y, group) {
  let fire = group.getFirstDead();

  // if we are recycling
  if (fire) {
    fire.reset(x, y);
  }
  // We need to create a new one
  else {
    fire = new Fire(x, y, group);
  }
  
  return fire;
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
