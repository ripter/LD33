/*global Phaser, game, bullets */
'use strict';

import R from 'ramda';
import * as Mob from './mob.js';
import * as Foreground from './foreground.js';
import * as Prop from './prop.js';
import * as Balloon from './balloon.js';
import {Spawner} from './spawner.js';
import {MAP, MOB, PROP, OTHER} from './constants.js';

// Groups with physics.
import {physicsGroup} from './groups.js';

export function loadTiledMap(game, mapKey) {
  const map = game.add.tilemap(mapKey);
  const props = map.properties;
  let mobGroup, balloonGroup, propGroup, spawnLayer, spawnerList;
  let bulletGroup;
  
  // Background image
  map.properties.background = game.add.image(0, 0, props.background); 

  // WARNING: Hardcoded values!
  map.addTilesetImage('paths', 'pathSpriteSheet');
  const layer = map.createLayer(MAP.LAYER.TILE);
  layer.resizeWorld();
  
  //
  // Paths
  // Path layers end with the word 'Path'
  const pathNameList = Object.keys(map.objects).filter((key) => {
    return key.endsWith('Path');
  });
  let paths = pathNameList.reduce((prev, pathName) => {
    prev[pathName] = createPath(map.objects[pathName]);
    return prev;
    //return createPath(map.objects[pathName]);
  }, {});

  //
  // Spawner
  mobGroup = physicsGroup();
  spawnLayer = map.objects[MAP.LAYER.SPAWN]; 
  spawnerList = spawnLayer.map((spawnDataItem) => {
    return new Spawner(mobGroup, spawnDataItem.properties, paths);
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
  // Bullet group
  bulletGroup = physicsGroup();
  
  //
  // Balloon!
  balloonGroup = physicsGroup(); 
  map.createFromObjects(MAP.LAYER.BALLOONS, OTHER.BALLOON, OTHER.BALLOON, null, true, false, balloonGroup);

  return {
    map
    , mobGroup
    , balloonGroup
    , propGroup
    , spawnerList
    , bulletGroup
  };
}

// Create our path from an object layer path that uses a polyline.
function createPath(layerPath) {
  if (!layerPath.length) { throw new Error('createPath: !layerPath.length'); } 
  if (layerPath.length === 0) { throw new Error('createPath: layerPath.length === 0'); }
  if (!layerPath[0].polyline) { throw new Error('createPath: !layerPath[0].polyline'); }

  const {x, y, polyline} = layerPath[0];
  const path = polyline.map((cords) => {
    return new Phaser.Point(cords[0] + x, cords[1] + y);
  });

  // create a tween version too
  //     {x: [0, 273, 0 ...], y: [50, 55, 142, ...]} 
  path.tween = {
    x: polyline.map((cords) => { return cords[0] + x; })
    , y: polyline.map((cords) => { return cords[1] + y; })
  };
  
  return path;
}
