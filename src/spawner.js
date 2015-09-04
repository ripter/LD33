/*global Phaser */
'use strict';

const DELAY = Phaser.Timer.SECOND;
import {Mob} from './mob.js';

export class Spawner {
  constructor(group, options, waypoints) {
    this.availableMobs = options.mobList.split(',').map((str) => { return str.trim(); });
    this.options = Object.assign({}, {
      speed: DELAY
    }, options);;
    this.group = group;
    this.game = group.game;
    this.waypoints = waypoints;
  }
  
  start() {
    const {game} = this;
    const {speed} = this.options;

    // Start the spawn loop.
    game.time.events.loop(speed, () => {
      const mob = this.next();
      mob.start();
    });
  }
  
  stop() {
    console.log('spawner.stop', arguments);
  }

  next() {
    const {game, group, waypoints} = this;
    const type = Phaser.ArrayUtils.getRandomItem(this.availableMobs);
    const freeMobs = group.filter((sprite) => {
      return sprite.alive === false && sprite.mobType === type;
    });
    let mob;
    
    //Do we have any free mobs we can recycle?
    if (freeMobs.total > 0) {
      mob = freeMobs.first; 
    } else {
      // We have to create a new one.
      mob = new Mob(type, group); 
    }
    
    // Set the path
    mob.setPath(waypoints);

    return mob;
  }
};
