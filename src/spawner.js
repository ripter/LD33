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

  next() {
    const {game, group, waypoints} = this;
    const type = Phaser.ArrayUtils.getRandomItem(this.availableMobs);
    let mob = getFirst(group, (sprite) => {
      return sprite.alive === false && sprite.mobType === type;
    });
    let alive = makeArray(group.forEachAlive.bind(group));
    let dead = makeArray(group.forEachDead.bind(group));
    
    // Did get a mob to reuse?
    if (!mob) {
      console.log(type, 'dead.length', dead.length, 'countDead', group.countDead());
      
      if (dead.length > 0) {
        debugger;
      }
      // console.group('New mob');
      // console.log('type', type);
      // console.log('countLiving', group.countLiving());
      // console.log('countDead', group.countDead());
      // console.groupEnd();
      mob = new Mob(type, group, waypoints);
    } else {
      console.log('RESUSE', type, mob.uuid);
    }

    return mob;
  }
};

function makeArray(forEachFunc) {
  const result = [];
  
  forEachFunc((item) => {
    result.push(item);
  });
  
  return result;
}
