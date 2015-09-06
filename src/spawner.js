/*global Phaser */
'use strict';

const DELAY = Phaser.Timer.SECOND;
import {Mob} from './mob.js';
import {getFirst} from './util.js';

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

  // Returns the next mob
  next() {
    const {game, group, waypoints} = this;
    const type = Phaser.ArrayUtils.getRandomItem(this.availableMobs);
    let mob = getFirst(group, (sprite) => {
      return sprite.alive === false && sprite.mobType === type;
    });
    
    // Did get a mob to reuse?
    if (!mob) {
      mob = new Mob(type, group, waypoints);
    }
    return mob;
  }
};

// Takes a forEach function
// @returns {Array} 
function makeArray(forEachFunc) {
  const result = [];
  
  forEachFunc((item) => {
    result.push(item);
  });
  
  return result;
}
