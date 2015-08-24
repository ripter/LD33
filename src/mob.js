/*global Phaser, game */
'use strict';

const DELAY = Phaser.Timer.SECOND;
const SPEED = 100; //Phaser.Timer.MINUTE * 4;
const HIT_RANGE = 5;

// Spawn a new sprite in the group.
export function spawn(group, data) {
  const {spriteKey} = data;
  const {x, y} = data.tract[0];

  let sprite = group.create(x, y, spriteKey);  

  sprite.alive = false;
  sprite.visible = false;
  sprite.anchor = {x: .5, y: 1};
  sprite.data = data;
  
  return sprite;
}


// start the timed game
export function startTimedGame(mobData) {
  const {list, group} = mobData;
  const length = group.length;
  let index = 0;

  // 'spawn' one human at a time with a time delay
  game.time.events.repeat(DELAY, length, () => {
    const mob = group.getAt(index);
    
    mob.alive = true;
    mob.visible = true;
    mob.tractIndex = -1;
    
    moveToNextWaypoint(mob);
    
    // work our why thought the list.
    index += 1;
  });
}

// Start the mob moving to the next waypoint
function moveToNextWaypoint(sprite) {
  const tract = sprite.data.tract;
  const speed = sprite.data.speed || SPEED;
  let nextIndex = sprite.tractIndex + 1;
  
  if (nextIndex === tract.length) {
    // loop back.
    nextIndex = 0;
  }

  const {x, y} = tract[nextIndex];

  sprite.tractIndex = nextIndex;
  game.physics.arcade.moveToXY(sprite, x, y, speed);
}

// collision checks
// @param {group} mobData
export function update(mobData) {
  const group = mobData.group;
  
  group.forEachAlive((sprite) => {
    const tract = sprite.data.tract;
    const index = sprite.tractIndex;
    const {x, y} = tract[index];
    const dist = game.physics.arcade.distanceToXY(sprite, x, y);

    if (dist <= HIT_RANGE) {
      moveToNextWaypoint(sprite);
    }
  });
}

export function mobsLeft(mobData) {
  const {group} = mobData;

  return group.countLiving();
}
