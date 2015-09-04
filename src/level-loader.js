/*global Phaser, game, bullets */
'use strict';

import * as Mob from './mob.js';
import * as Foreground from './foreground.js';
import * as Prop from './prop.js';
import * as Balloon from './balloon.js';
import {MAP, MOB, BALLOON, PROP} from './constants.js';

// Groups with physics.
import {physicsGroup} from './groups.js';

export function loadTiledMap(game, mapKey) {
  const map = game.add.tilemap(mapKey);
  const props = map.properties;
  let layer, mobGroup, balloonGroup, propGroup;
  
  // Background image
  map.properties.background = game.add.image(0, 0, props.background); 

  // WARNING: Hardcoded values!
  map.addTilesetImage('paths', 'pathSpriteSheet');
  layer = map.createLayer(MAP.LAYER.PATH);
  //layer.resizeWorld();
  
  //
  // Mob group!
  mobGroup = physicsGroup();
  // Get the mobs from the map and create them.
  Object.keys(MOB).forEach((key) => {
    map.createFromObjects(MAP.LAYER.MOBS, MOB[key], MOB[key], null, true, false, mobGroup);
  });
  // set standard properties
  mobGroup.setAll('anchor', {x: .5, y: 1});
  mobGroup.setAll('body.moves', false);
  mobGroup.setAll('alive', false);
  mobGroup.forEach(Mob.createPathTween, null, false, map);
 
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
  };
}
