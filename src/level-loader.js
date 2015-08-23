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
  //const waypointGroup = spawnWaypointsGroup(lvl.waypoints);

  return {
    background: background
    , score: 0
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

function spawnWaypointsGroup(waypoints) {
  let group = game.add.group();
  
  Object.keys(waypoints).forEach((tractName) => {
    waypoints[tractName].forEach((point) => {
      group.create(point.x, point.y, 'waypoint');
    });
  });
  
  return group;
}
