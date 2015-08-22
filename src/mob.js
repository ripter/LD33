/*global Phaser, game */
'use strict';

const DELAY = Phaser.Timer.SECOND * 5;
const SPEED = 100; //Phaser.Timer.MINUTE * 4;

export function moveToPoint(sprite, waypoint) {
  let {x, y} = waypoint;

  console.log('waypoint', x, y);
  sprite.waypointIndex = waypoint.index;
  game.physics.arcade.accelerateToXY(sprite, x, y, SPEED);
}

export function run(group, waypoints) {
  const offscreen = waypoints.children[0];
  const onscreen = waypoints.children[1];
  let index = 0;


  game.time.events.repeat(DELAY, group.length, () => {
    let child = group.children[index]; 
    
    // init offscreen
    child.x = offscreen.x;
    child.y = offscreen.y;
    
    // move to the first onscreen point
    moveToPoint(child, onscreen);
    
    // work our why thought the list.
    index += 1;
  });
}
