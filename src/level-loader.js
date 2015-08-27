/*global Phaser, game, bullets */
'use strict';

import * as Mob from './mob.js';
import * as Foreground from './foreground.js';
import * as Balloon from './balloon.js';

// Groups with physics.
import {physicsGroup} from './groups.js';

/**
 * Loads a level data file.
 * Returns a level gamestate object.
 */
export function loadLevel(lvl) {
  // These are in order by z-index
  const background = game.add.image(0, 0, lvl.background);
  const mobList = loadMobList(lvl.mobs, lvl.waypoints);
  const mobGroup = spawnMobGroup(mobList);
  const fgGroup = spawnForegroundGroup(lvl.foreground);
  const balloonGroup = spawnBalloonGroup(lvl.balloons);
  //const waypointGroup = spawnWaypointsGroup(lvl.waypoints);

  return {
    background: background
    , state: 'pregame'
    , score: 0
    , mobs: {
      list: mobList
      , group : mobGroup
    }
    , fgGroup: fgGroup
    , balloons: balloonGroup
    , bullets: physicsGroup()
  };
}

// Make a loaded level editable (for editor)
export function makeEditable(level) {
  return Object.assign({}, level, {
    fgGroup: level.fgGroup.forEach(makeDragable, this)
  });
}
  
function makeDragable(sprite) {
  sprite.inputEnabled = true;
  sprite.input.enableDrag(true);
  return sprite;
}

// Join the mob with the tract data.
// this way every mob knows their entire tract
function loadMobList(lvlMobs, lvlWaypoints) {
  return lvlMobs.map((lvlMob) => {
    const tractName = lvlMob.tract;
    
    return Object.assign({}, lvlMob, {
      spriteKey: lvlMob.spriteKey
      , tractName: tractName
      , tract: lvlWaypoints[tractName]
    });
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

function spawnBalloonGroup(balloonList) {
  let group = physicsGroup();
  
  balloonList.forEach((data) => {
    const sprite = Balloon.spawn(group, data);
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
