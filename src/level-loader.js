/*global Phaser, game, bullets */
'use strict';

import * as Mob from './mob.js';
import * as Foreground from './foreground.js';
import * as Prop from './prop.js';
import * as Balloon from './balloon.js';
import {Spawner} from './spawner.js';
import {MAP, MOB, BALLOON, PROP} from './constants.js';

// Groups with physics.
import {physicsGroup} from './groups.js';

export function loadTiledMap(game, mapKey) {
  const map = game.add.tilemap(mapKey);
  const props = map.properties;
  let layer, mobGroup, balloonGroup, propGroup, spawnLayer, spawnerList;
  
  // Background image
  map.properties.background = game.add.image(0, 0, props.background); 

  // WARNING: Hardcoded values!
  map.addTilesetImage('paths', 'pathSpriteSheet');
  layer = map.createLayer(MAP.LAYER.PATH);
  //layer.resizeWorld();
  
  //
  // Spawner
  mobGroup = physicsGroup();
  spawnLayer = map.objects[MAP.LAYER.SPAWN]; 
  spawnerList = spawnLayer.map((spawnDataItem) => {
    const pathName = spawnDataItem.properties.pathName;
    const layer = map.objects[pathName][0];
    const waypoints = toTweenPoints(layer);

    return new Spawner(mobGroup, spawnDataItem.properties, waypoints);
  });

  //
  // Props group
  propGroup = physicsGroup();
  // Get all the prop types from the PROP and create each type.
  Object.keys(PROP).forEach((key) => {
    map.createFromObjects(MAP.LAYER.PROPS, PROP[key], PROP[key], null, true, false, propGroup);
  });
  // set standard properties
  //propGroup.setAll('anchor', {x: .25, y: .85});
  mobGroup.setAll('anchor', {x: .5, y: 1});
  propGroup.setAll('body.moves', false);
  propGroup.forEach(Prop.addAnimation);
  
  //
  // Balloon!
  balloonGroup = physicsGroup(); 
  map.createFromObjects(MAP.LAYER.BALLOONS, BALLOON, BALLOON, null, true, false, balloonGroup);

  return {
    map
    , mobGroup
    , balloonGroup
    , propGroup
    , spawnerList
  };
}


function toTweenPoints(layer) {
  const {x, y, polyline} = layer;
  // We want:
  //     {x: [0, 273, 0 ...], y: [50, 55, 142, ...]} 
  return {
    x: polyline.map((point) => { return point[0] + x; })
    , y: polyline.map((point) => { return point[1] + y; })
  };
}
