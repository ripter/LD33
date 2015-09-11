/*global Phaser */
'use strict';

const DELAY = Phaser.Timer.SECOND;
import {Mob} from './mob.js';
import {getFirst, splitTrim} from './util.js';

export class Spawner {
  constructor(group, options, paths) {
    this.availableMobs = splitTrim(options.mobList);
    this.availablePaths = splitTrim(options.pathList);
    this.options = Object.assign({}, {
      speed: DELAY
    }, options);;
    this.group = group;
    this.game = group.game;
    this.paths = paths;
  }
  
  start() {
    const {game} = this;
    const {speed} = this.options;

    // Start the spawn loop.
    game.time.events.loop(speed, () => {
      const pathName = Phaser.ArrayUtils.getRandomItem(this.availablePaths);
      const path = this.paths[pathName];
      const mob = this.next();

      if (!path) { throw new Error(`Spawner could not find a path named "${pathName}".`); }
      console.log(pathName, path);
      mob.start(path);
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
