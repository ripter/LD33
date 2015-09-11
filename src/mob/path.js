/*global */
'use strict';

const ukey = Symbol('path.js');

// Start the sprite moving on the path.
export function start(sprite, pointList) {
  const {x, y} = pointList[0];

  sprite[ukey] = {
    target: {x, y}
    , pointList: pointList
    , index: 0
  };

  // move to the first point
  sprite.reset(x, y);
  moveToPoint(sprite);
}

export function update(sprite) {
  const {game} = sprite;
  const {x, y} = sprite[ukey].target;

  const dist = game.physics.arcade.distanceToXY(sprite, x, y);
  
  // We will never reach 0, we just need to be visually close.
  if (dist <= 3) {
    moveToPoint(sprite);
  }
}

// function next(sprite) {
function moveToPoint(sprite) {
  const {game} = sprite;
  const {pointList, index} = sprite[ukey];
  const {x, y} = pointList[index];
  const speed = 100; //Tween speed is 1500, way to fast for us.

  sprite[ukey].target = {x, y};
  sprite[ukey].index = getNextIndex(sprite);
  game.physics.arcade.moveToXY(sprite, x, y, speed);
}

function getNextIndex(sprite) {
  const {pointList, index} = sprite[ukey];
  let nextIndex = index + 1;

  // if we run out of points, restart
  if (nextIndex === pointList.length) {
    nextIndex = 0;
  }
  
  return nextIndex;
}
