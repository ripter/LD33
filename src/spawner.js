/*global Phaser */
'use strict';

import {Mob} from './mob.js';

export class Spawner {
  constructor(group, options, waypoints) {
    this.availableMobs = options.mobList.split(',').map((str) => { return str.trim(); });
    this.options = options;
    this.group = group;
    this.game = group.game;
    this.waypoints = waypoints;
  }
  
  start() {
    console.log('spawner.start', arguments);
    const mob = this.next();
    mob.start();
  }
  
  stop() {
    console.log('spawner.stop', arguments);
  }

  next() {
    const {game, waypoints} = this;
    const type = Phaser.ArrayUtils.getRandomItem(this.availableMobs);
    const mob = new Mob(type, this.group); 

    mob.setPath(waypoints);
    return mob;
  }
};
