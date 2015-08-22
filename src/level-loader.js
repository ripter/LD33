/*global Phaser, game, bullets */
'use strict';

// Groups with physics.
import {createGroup} from './groups.js';

// create a group of waypoints that exist at [{x,y} ...]
export function spawnWaypoints(points) {
  let group = createGroup();
  
  points.forEach((point) => {
    group.create(point.x, point.y, 'waypoint');
  });
  
  return group;
}

export function spawnMobs(points) {
  let group = createGroup();
}
