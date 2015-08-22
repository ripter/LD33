/*global Phaser, game, bullets */
'use strict';

// Groups with physics.
import {createGroup} from './groups.js';

// create a group of waypoints that exist at [{x,y} ...]
export function spawnWaypoints(points) {
  let group = createGroup();
  
  points.forEach((point) => {
    let sprite = group.create(point.x, point.y, 'waypoint');
    sprite.anchor = {x: .5, y: 1};
    sprite.body.immovable = true;
  });
  
  return group;
}

export function spawnProps(list) {
  let group = spawnSprites(list);
  
  group.setAll('body.immovable', true);

  return group;
}

export function spawnSprites(list) {
  let group = createGroup();

  list.forEach((point) => {
    let sprite = group.create(point.x, point.y, point.spriteKey);  
    sprite.anchor = {x: .5, y: 1};
  });
  
  return group;
}
