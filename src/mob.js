/*global Phaser, game */
'use strict';

const DELAY = Phaser.Timer.SECOND;
const SPEED = Phaser.Timer.SECOND * 15;
const HIT_RANGE = 5;

// Spawn a new sprite in the group.
export function spawn(group, data) {
  const {spriteKey} = data;
  const {x, y} = data.tract[0];

  let sprite = group.create(x, y, spriteKey);  

  sprite.alive = false;
  sprite.visible = false;
  sprite.anchor = {x: .5, y: 1};
  sprite.body.moves = false; // use tweens
  sprite.data = data;
  sprite.pathTween = createPathTween(sprite, sprite.data.tract);
  
  return sprite;
}


function createPathTween(sprite, pathList) {
  const game = sprite.game;
  const speed = sprite.data.speed || SPEED;
  const path = game.add.tween(sprite);
  // We want:
  //     {x: [0, 273, 0 ...], y: [50, 55, 142, ...]} 
  const x = pathList.map(function(point) { return point.x; });
  const y = pathList.map(function(point) { return point.y; });
  
  // speed is per point. So points that are further away will cause
  // the sprite to move faster. 
  // On the plus, we can control speed via points.
  // Options:
  //  set speed as a function of distance between points.
  //  allow sprite to adjust the speed
  //  allow points to set/adjust the speed
  path.to({x: x, y: y}, speed);
  // const waypoints = pathList.map(function(point) {
  //   return game.add.tween(sprite).to(point, speed);
  // });
   
  // // chain all the waypoints into the path.
  // path.from({x: 100, y: 100}, speed);
  // path.chain(waypoints);
  
  return path;
}


// start the timed game
export function startTimedGame(mobData) {
  const {list, group} = mobData;
  const length = group.length;
  let index = 0;

  // 'spawn' one human at a time with a time delay
  game.time.events.repeat(DELAY, length, () => {
    console.log('repeat', arguments);
    const mob = group.getAt(index);
    
    mob.reset(0, 0);
    mob.pathTween.start().loop(true);

    // mob.alive = true;
    // mob.visible = true;
    // mob.tractIndex = -1;
    
    // moveToNextWaypoint(mob);
    
    // Keep our own index
    index += 1;
  });
}

// Start the mob moving to the next waypoint
function moveToNextWaypoint(sprite) {
  const tract = sprite.data.tract;
  const speed = sprite.data.speed || SPEED;
  let nextIndex = sprite.tractIndex + 1;
  
  if (nextIndex === tract.length) {
    // loop back.
    nextIndex = 0;
  }

  const {x, y} = tract[nextIndex];

  sprite.tractIndex = nextIndex;
  game.physics.arcade.moveToXY(sprite, x, y, speed);
}

// collision checks
// @param {group} mobData
export function update(mobData) {
  const group = mobData.group;
  
  group.forEachAlive((sprite) => {
    const tract = sprite.data.tract;
    const index = sprite.tractIndex;
    const {x, y} = tract[index];
    const dist = game.physics.arcade.distanceToXY(sprite, x, y);

    if (dist <= HIT_RANGE) {
      moveToNextWaypoint(sprite);
    }
  });
}

export function mobsLeft(mobData) {
  const {group} = mobData;

  return group.countLiving();
}
