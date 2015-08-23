/*global Phaser, game */
'use strict';

const DELAY = Phaser.Timer.SECOND * 1;
const SPEED = 100; //Phaser.Timer.MINUTE * 4;
const HIT_RANGE = 5;

// Spawn a new sprite in the group.
export function spawn(group, data) {
  const {x, y, spriteKey} = data;
  let sprite = group.create(x, y, spriteKey);  

  sprite.alive = false;
  sprite.anchor = {x: .5, y: 1};
  sprite.data = data;
  
  return sprite;
}


// start the timed game
export function startTimedGame(mobData) {
  const {list, group} = mobData;
  const length = group.length;
  let index = 0;

  // 'spawn' one human at a time with a time delay
  game.time.events.repeat(DELAY, length, () => {
    const mob = group.getAt(index);
    
    mob.alive = true;
    mob.tractIndex = -1;
    
    moveToNextWaypoint(mob);
    
    // work our why thought the list.
    index += 1;
  });
}

// Start the mob moving to the next waypoint
function moveToNextWaypoint(sprite) {
  const tract = sprite.data.tract;
  let nextIndex = sprite.tractIndex + 1;
  
  if (nextIndex === tract.length) {
    // loop back.
    nextIndex = 0;
  }

  const {x, y} = tract[nextIndex];

  sprite.tractIndex = nextIndex;
  game.physics.arcade.moveToXY(sprite, x, y, SPEED);
}

// collision checks
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

//
// --------------
//

export function moveToPoint(sprite, waypoint) {
  const {x, y, tract, index} = waypoint;

  debugger;
  sprite.waypointIndex = index;
  sprite.nextWaypoint = tract[index+1];
  game.physics.arcade.moveToXY(sprite, x, y, SPEED);
}

export function moveToWaypoint_OLD(mob, index) {
  const tract = mob.tract;
  const nextIndex = index + 1;
  const {x, y} = tract[nextIndex];

  mob.tractIndex = nextIndex;
  game.physics.arcade.moveToXY(mob, x, y, SPEED);
}

export function run(mobs, waypoints) {
  let index = 0;

  // 'spawn' one human at a time with a time delay
  game.time.events.repeat(DELAY, mobs.length, () => {
    const mob = mobs.getAt(index);
    
    mob.alive = true;
    // move to the first onscreen point
    moveToWaypoint(mob, 0);
    
    // work our why thought the list.
    index += 1;
  });
}

export function checkWaypoints(group, waypoints) {
  group.forEachAlive((mob) => {
    const tract = mob.tract;
    const index = mob.tractIndex;
    const {x, y} = tract[index];
    const dist = game.physics.arcade.distanceToXY(mob, x, y);

    console.log('dist', dist);
    if (dist <= HIT_RANGE) {
      moveToWaypoint(mob, index + 1);
    }
  });
}


export function loadTracts(mobs, waypoints, lvlWaypoints) {
  //uhhhhhhh, just do it the stupid way
  mobs.forEach((mob) => {
    const tractName = mob.tractName;
    const tract = lvlWaypoints[tractName];
    
    mob.tract = tract;
    mob.tractIndex = 0;
  });
}
