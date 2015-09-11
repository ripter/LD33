/*global Phaser, game */
'use strict';

import * as mobTween from './mob/tween.js';
import * as mobPath from './mob/path.js';
import {MOB} from './constants.js';

const USE_TWEEN = false;
const DELAY = Phaser.Timer.SECOND;
const SPEED = Phaser.Timer.SECOND * 15;
const HIT_RANGE = 5;

// debug stats
window.mobCount = 0;

export class Mob extends Phaser.Sprite {
  constructor(type, group) {
    const {game} = group;
    super(game, 100, 100, type);
    // We need to add to the group so we get physics .body
    group.add(this);
    
    this.alive = false;
    this.anchor = {x: .5, y: 1};
    this.mobType = type;
    this.speed = SPEED;

    // Setup a path system
    if (USE_TWEEN) {
      mobTween.init(this);
    }
    // debug stats
    window.mobCount += 1;
  }
  
  // Start the mob moving along the path.
  start(pointList) {
    // const {x, y} = this.pathStart;

    // // reset to first path point
    // this.reset(x, y);
    
    // if (USE_TWEEN) {
    //   mobTween.start(this, waypoints) 
    //     .onComplete.addOnce(() => {
    //     this.kill();
    //   });
    // } else {
    //   mobPath.start(this, waypoints);
    // }
    
    if (!pointList) { throw new Error('mob.start: !pointList'); }

    // Start the mob moving on the path
    mobPath.start(this, pointList);
  }
  
  update() {
    super.update();
    if (!USE_TWEEN) {
      mobPath.update(this);
    }
  }
  
  kill() {
    if (USE_TWEEN) {
      mobTween.stop(this);
    }

    super.kill();
  }
  
};


// start the timed game
export function startTimedGame(mobGroup) {
  const length = mobGroup.length;
  let index = 0;

  // activate/reset one human at a time with a time delay
  game.time.events.repeat(DELAY, length, () => {
    // FIX: get next mob in line
    // IDEA: alternate between paths
    // IDEA: Pick at random
    // IDEA: alternate paths & pick at random for that path.
    //const mob = mobGroup.getAt(index);
    const deadList = mobGroup.filter((sprite) => { return !sprite.alive; });
    const mob = Phaser.ArrayUtils.getRandomItem(deadList.list);
    const {x, y} = mob.pathStart;

    // reset to first path point
    mob.reset(x, y);

    // FUTURE: if balloon is gone, pick another path on loop
    mob.pathTween.start().loop(true);

    // Keep our own index
    index += 1;
  });
}


