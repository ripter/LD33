/*global Phaser, game */
'use strict';

const DELAY = Phaser.Timer.SECOND;
const SPEED = Phaser.Timer.SECOND * 15;
const HIT_RANGE = 5;

// Spawn a new sprite in the group.
export function spawn(group, data, waypoints) {
  const {spriteKey} = data;
  let sprite = group.create(0, 0, spriteKey);  

  sprite.alive = false;
  sprite.visible = false;
  sprite.anchor = {x: .5, y: 1};
  sprite.body.moves = false; // use tweens
  sprite.data = data;
  //sprite.pathTween = createPathTween(sprite, waypoints);
  
  return sprite;
}

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
  return sprite;
}

// start the timed game
export function startTimedGame(mobGroup) {
  const length = mobGroup.length;
  let index = 0;

  // activate/reset one human at a time with a time delay
  game.time.events.repeat(DELAY, length, () => {
    const mob = mobGroup.getAt(index);
    
    mob.reset(0, 0);
    mob.pathTween.start().loop(true);

    // Keep our own index
    index += 1;
  });
}
