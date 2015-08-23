/*global Phaser, game */
'use strict';

const DELAY = Phaser.Timer.SECOND * 5;
const SPEED = 100; //Phaser.Timer.MINUTE * 4;
const HIT_RANGE = 5;

export function moveToPoint(sprite, waypoint) {
  let {x, y} = waypoint;

  sprite.waypointIndex = waypoint.index;
  game.physics.arcade.moveToXY(sprite, x, y, SPEED);
}

export function run(group, waypoints) {
  const offscreen = waypoints.children[0];
  const onscreen = waypoints.children[1];
  let index = 0;

  // 'spawn' one human at a time with a time delay
  game.time.events.repeat(DELAY, group.length, () => {
    let child = group.children[index]; 
    
    // init offscreen
    child.x = offscreen.x;
    child.y = offscreen.y;
    child.alive = true;
    
    // move to the first onscreen point
    moveToPoint(child, onscreen);
    
    // work our why thought the list.
    index += 1;
  });
}

export function checkWaypoints(group, waypoints) {

  group.forEachAlive((mob) => {
    if (mob.health === 0) { return; }
    const lastIndex = mob.waypointIndex;
    const nextIndex = lastIndex + 1;
    const nextWaypoint = waypoints.children[nextIndex];
    const point = waypoints.children[lastIndex];
    const dist = game.physics.arcade.distanceToXY(mob, point.x, point.y);

    //console.log('dist', dist);
    if (dist <= HIT_RANGE) {
      moveToPoint(mob, nextWaypoint);
    }
  });
}
