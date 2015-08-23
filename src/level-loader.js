/*global Phaser, game, bullets */
'use strict';

import * as Mob from './mob.js';
// Groups with physics.
import {physicsGroup} from './groups.js';

// Load the level from a lvl object.
export function loadLevel(lvl) {
  const mobList = loadMobList(lvl.mobs, lvl.waypoints);
  const mobGroup = spawnMobGroup(mobList);
  
  return {
    mobs: {
      list: mobList
      , group : mobGroup
    }
  };
}

// Join the mob with the tract data.
// this way every mob knows their entire tract
function loadMobList(lvlMobs, lvlWaypoints) {
  return lvlMobs.map((lvlMob) => {
    const tractName = lvlMob.tract;

    lvlMob.tractName = tractName;
    lvlMob.tract = lvlWaypoints[tractName];
    return lvlMob;
  });
}

function spawnMobGroup(mobList) {
  let group = physicsGroup();
  
  mobList.forEach((data) => {
    const mob = Mob.spawn(group, data);
  });

  return group;
}


// create a group of waypoints that exist at [{x,y} ...]
export function spawnWaypoints(lvlData) {
  let group = game.add.group();
  
  Object.keys(lvlData).forEach((name) => {
    const tract = lvlData[name];

    tract.forEach((point, index) => {
      let sprite = group.create(point.x, point.y, 'waypoint');
      sprite.anchor = {x: .5, y: 1};

      // set our stuff
      sprite.waypointIndex = index;
      sprite.tract = tract;
      sprite.tractName = name;
    });
  });
  
  return group;
}

export function spawnProps(list) {
  let group = spawnSprites(list);
  
  group.setAll('body.immovable', true);

  return group;
}

export function spawnMobs(list) {
  let group = spawnSprites(list);
  
  group.forEach((mob) => {
    mob.tractName = mob.data.tract;
    mob.waypointIndex = 0;
    mob.alive = false;
  });

  return group;
}

export function spawnSprites(list) {
  let group = createGroup();

  list.forEach((point) => {
    let sprite = group.create(point.x, point.y, point.spriteKey);  
    sprite.anchor = {x: .5, y: 1};
    sprite.data = point;
  });
  
  return group;
}

