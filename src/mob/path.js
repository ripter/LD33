/*global */
'use strict';

export function init(sprite) {
  sprite.pathIndex = 0;
}

// Start the sprite moving on the path.
export function start(sprite) {
  sprite.pathIndex = 0;
  next(sprite);
}

export function update(sprite) {
  const {game, pathTarget, width} = sprite;
  const {x, y} = pathTarget;
  const dist = game.physics.arcade.distanceToXY(sprite, x, y);
  
  // We will never reach 0, we just need to be visually close.
  if (dist <= 3) {
    next(sprite);
  }
}

function next(sprite) {
  const {game, pathIndex} = sprite;
  const speed = 100; //Tween speed is 1500, way to fast for us.
  const {x, y} = getNextWaypoint(sprite);
  
  game.physics.arcade.moveToXY(sprite, x, y, speed);
}

function getNextWaypoint(sprite) {
  const {pathIndex, waypoints} = sprite;
  const x = waypoints.x[pathIndex+1];
  const y = waypoints.y[pathIndex+1];
  
  // These probably shouldn't be here.
  // They are the only side effects.
  sprite.pathIndex = pathIndex+1;
  sprite.pathTarget = {x, y};
  return {x, y};
}
