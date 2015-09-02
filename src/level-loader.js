/*global Phaser, game, bullets */
'use strict';

import * as Mob from './mob.js';
import * as Foreground from './foreground.js';
import * as Balloon from './balloon.js';

// Groups with physics.
import {physicsGroup} from './groups.js';

// Load the level from a lvl object.
export function loadLevel(lvl) {
  // These are in order by z-index
  const background = game.add.image(0, 0, lvl.background);
  const mobGroup = spawnMobGroup(lvl.mobs, lvl.waypoints);
  const fgGroup = spawnForegroundGroup(lvl.foreground);
  const balloonGroup = spawnBalloonGroup(lvl.balloons);

  return {
    background: background
    , state: 'pregame'
    , score: 0
    , mobGroup: mobGroup
    , fgGroup: fgGroup
    , balloons: balloonGroup
  };
}

function spawnMobGroup(mobList, waypoints) {
  let group = physicsGroup();

  mobList.forEach((mobData) => {
    const pathName = mobData.pathName;
    const sprite = Mob.spawn(group, mobData, waypoints[pathName]);
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


export function loadTiledMap(game, mapKey) {
  const map = game.add.tilemap(mapKey);
  let layer, waypointLayer, objectLayer;
  
  // WARNING: Hardcoded values!
  map.addTilesetImage('paths', 'pathSpriteSheet');
  layer = map.createLayer('pathLayer');
  objectLayer = map.objects;
  
  //TODO:
  // create the mobGroup, using waypoints from the objectLayer.
  
  // Need mob list
  // Spawn mobs
  // Convert waypoints/paths to mobGroup (Mob Sprites tween paths)
  
  return map;
}
