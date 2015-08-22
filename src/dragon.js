/*global Phaser, game */

import Fire from './fire.js';

const SPEED = 100;
const SPRITE_CACHE = 'dragon';
const FIRE_OFFSET_Y = -100;
const FIRE_OFFSET_X = 25;
const FIRE_SPEED = Phaser.Timer.HALF;


function Dragon(game, x, y) {
  this.game = game;
  this.sprite = game.add.sprite(x, y, 'dragon');
  game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
}
Dragon.prototype = {
  update() {
    const game = this.game;
    const {LEFT, RIGHT, SPACEBAR} = Phaser.Keyboard;
    
    // Movement keys
    if (game.input.keyboard.isDown(LEFT)) { 
      this.sprite.body.velocity.x = -SPEED;
    }
    else if (game.input.keyboard.isDown(RIGHT)) {
      this.sprite.body.velocity.x = SPEED;
    }
    else {
      this.sprite.body.velocity.x = 0;
    }
    
    // FIRE!!!
    if (game.input.keyboard.isDown(SPACEBAR)) {
      this.fire(); 
    }
  }
  
  , fire() {
    if (this.bullet) { return; }
    const {x, y} = this.sprite;
    
    this.bullet = new Fire(this.game, x + FIRE_OFFSET_X, y + FIRE_OFFSET_Y);
    
    // Delay before they can fire again.
    this.game.time.events.add(FIRE_SPEED, this.resetFire, this);
  }
  
  , resetFire() {
    this.bullet = null;
  }
};
export default Dragon;


export function spawnDragon(x, y) {
  let sprite = game.add.sprite(x, y, 'dragon');
  game.physics.enable(sprite, Phaser.Physics.ARCADE);
  
  return sprite;
}
