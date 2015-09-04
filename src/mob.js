/*global Phaser, game */
'use strict';

const DELAY = Phaser.Timer.SECOND;
const SPEED = Phaser.Timer.SECOND * 15;
const HIT_RANGE = 5;

// Create tween between all points in the path.
export function createPathTween(sprite, map) {
  const game = sprite.game;
  const speed = sprite.speed || SPEED;
  const pathName = sprite.pathName;
  const pathTween = game.add.tween(sprite);
  const {x, y, polyline} = map.objects[pathName][0];
  // We want:
  //     {x: [0, 273, 0 ...], y: [50, 55, 142, ...]} 
  const sx = polyline.map((point) => { return point[0] + x; });
  const sy = polyline.map((point) => { return point[1] + y; });
  
  // speed is per point. So points that are further away will cause
  // the sprite to move faster. 
  // On the plus, we can control speed via points.
  // Options:
  //  set speed as a function of distance between points.
  //  allow sprite to adjust the speed
  //  allow points to set/adjust the speed
  pathTween.to({x: sx, y: sy}, speed);
  

  sprite.pathTween = pathTween;
  sprite.pathStart = {x: sx[0], y: sy[0]};
  return sprite;
}

// start the timed game
export function startTimedGame(mobGroup) {
  const length = mobGroup.length;
  let index = 0;

  // activate/reset one human at a time with a time delay
  game.time.events.repeat(DELAY, length, () => {
    // FIX: get next mob in line
    // IDEA: alternate between paths
    // IDEA: Pick at random
    // IDEA: alternate paths & pick at random for that path.
    //const mob = mobGroup.getAt(index);
    const deadList = mobGroup.filter((sprite) => { return !sprite.alive; });
    const mob = Phaser.ArrayUtils.getRandomItem(deadList.list);
    const {x, y} = mob.pathStart;

    // reset to first path point
    mob.reset(x, y);

    // FUTURE: if balloon is gone, pick another path on loop
    mob.pathTween.start().loop(true);

    // Keep our own index
    index += 1;
  });
}
