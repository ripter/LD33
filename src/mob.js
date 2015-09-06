/*global Phaser, game */
'use strict';

import {MOB} from './constants.js';
import {createUUID} from './util.js';

const DELAY = Phaser.Timer.SECOND;
const SPEED = Phaser.Timer.SECOND * 15;
const HIT_RANGE = 5;

// debug stats
window.mobCount = 0;

export class Mob extends Phaser.Sprite {
  constructor(type, group, waypoints) {
    const {game} = group;
    super(game, 100, 100, type);
    // We need to add to the group so we get physics .body
    group.add(this);
    
    this.uuid = createUUID();
    this.speed = SPEED;
    this.alive = false;
    this.anchor = {x: .5, y: 1};
    this.body.moves = false;
    this.mobType = type;
    
    this.waypoints = waypoints;
    this.pathStart = {x: waypoints.x[0], y: waypoints.y[0]};
    //this.setPath(waypoints);
    // debug stats
    window.mobCount += 1;
  }
  
  // Start the mob moving along the path.
  start() {
    const {x, y} = this.pathStart;

    // reset to first path point
    this.reset(x, y);
    this.setPath(this.waypoints);
    this.pathTween.start();//.loop(true);
  }
  
  kill() {
    console.log('Mob.kill', this.mobType, this.alive);
    // Stop the tweeens!
    if (this.pathTween.isRunning) {
      this.pathTween.stop();
    }

    super.kill();
  }
  
  // Sets the path to follow.
  setPath(waypoints) {
    const {game, speed} = this;
    const {x, y} = waypoints;
    const pathTween = game.add.tween(this);

    // speed is per point. So points that are further away will cause
    // the sprite to move faster. 
    // On the plus, we can control speed via points.
    // Options:
    //  set speed as a function of distance between points.
    //  allow sprite to adjust the speed
    //  allow points to set/adjust the speed
    pathTween.to({x: x, y: y}, speed);
    pathTween.onComplete.addOnce(() => {
      this.kill();
    });

    //this.pathStart = {x: x[0], y: y[0]};
    this.pathTween = pathTween; 
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


