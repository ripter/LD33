/*global */
'use strict';


// initalize the sprite for tween functions
export function init(sprite) {
  // Let the physics engine know we
  // are using tweens now.
  sprite.body.moves = false;
}

// Start the tween
// waypoints:
//     {x: [0, 273, 0 ...], y: [50, 55, 142, ...]} 
export function start(sprite, waypoints) {
  setPath(sprite, waypoints);
  sprite.pathTween.start();

  return sprite.pathTween;
}

// Stop the tween
export function stop(sprite) {
  if (!sprite.pathTween) { return; }

  // Stop the tweeens!
  if (sprite.pathTween.isRunning) {
    sprite.pathTween.stop();
  }
  sprite.pathTween = null;
}

// Sets the path to follow.
function setPath(sprite, waypoints) {
  const {game, speed} = sprite;
  const {x, y} = waypoints;
  const pathTween = game.add.tween(sprite);

  // speed is per point. So points that are further away will cause
  // the sprite to move faster. 
  // On the plus, we can control speed via points.
  // Options:
  //  set speed as a function of distance between points.
  //  allow sprite to adjust the speed
  //  allow points to set/adjust the speed
  pathTween.to({x: x, y: y}, speed);

  //this.pathStart = {x: x[0], y: y[0]};
  sprite.pathTween = pathTween; 
  return pathTween;
}
