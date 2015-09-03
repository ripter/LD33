/*global Phaser, game, bullets */
'use strict';

import * as Mob from './mob.js';
import * as Foreground from './foreground.js';
import * as Balloon from './balloon.js';
import {MAP, MOB, BALLOON, PROP} from './constants.js';

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
  const props = map.properties;
  let mobGroup, balloonGroup, propGroup;
  
  // Background image
  map.properties.background = game.add.image(0, 0, props.background); 

  // WARNING: Hardcoded values!
  map.addTilesetImage('paths', 'pathSpriteSheet');
  map.createLayer(MAP.LAYER.PATH);
  
  //
  // Mob group!
  mobGroup = physicsGroup();
  // Get the mobs from the map and create them.
  Object.keys(MOB).forEach((key) => {
    map.createFromObjects(MAP.LAYER.MOBS, MOB[key], MOB[key], null, true, false, mobGroup);
  });
  // set standard props
  mobGroup.setAll('anchor', {x: .25, y: .85});
  mobGroup.setAll('body.moves', false);
  mobGroup.forEach(Mob.createPathTween, null, false, map);
  
  //
  // Props group
  propGroup = physicsGroup();
  // Get all the prop types from the PROP and create each type.
  Object.keys(PROP).forEach((key) => {
    map.createFromObjects(MAP.LAYER.PROPS, PROP[key], PROP[key], null, true, false, propGroup);
  });
  
  //
  // Balloon!
  balloonGroup = physicsGroup(); 
  map.createFromObjects(MAP.LAYER.BALLOONS, BALLOON, BALLOON, null, true, false, balloonGroup);

  return {
    map
    , mobGroup
    , balloonGroup
    , propGroup
  };
}
