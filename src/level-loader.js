/*global Phaser, game, bullets */
'use strict';

import * as Mob from './mob.js';
import * as Foreground from './foreground.js';

// Groups with physics.
import {physicsGroup} from './groups.js';

// Load the level from a lvl object.
export function loadLevel(lvl) {
  // These are in order by z-index
  const background = game.add.image(0, 0, lvl.background);
  const mobList = loadMobList(lvl.mobs, lvl.waypoints);
  const mobGroup = spawnMobGroup(mobList);
  const fgGroup = spawnForegroundGroup(lvl.foreground);
  
  return {
    background: background
    , mobs: {
      list: mobList
      , group : mobGroup
    }
    , fgGroup: fgGroup
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
    const sprite = Mob.spawn(group, data);
  });

  return group;
}

function spawnForegroundGroup(foregroundList) {
  let group = physicsGroup();

  foregroundList.forEach((data) => {
    const sprite = Foreground.spawn(group, data);
  });

  return group;
}


//
// ---------------------------
//

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

