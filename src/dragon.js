/*global Phaser */

import Fire from './fire.js';

const SPEED = 100;
const SPRITE_CACHE = 'dragon';
const FIRE_OFFSET_Y = 0;
const FIRE_OFFSET_X = 50;

class Dragon {
  constructor(game, x, y) {
    this.game = game;
    this.sprite = game.add.sprite(x, y, SPRITE_CACHE);
    // PHYSICS!!!!!
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
  }
  
  update() {
    const game = this.game;
    const {LEFT, RIGHT, SPACE} = Phaser.Keyboard;
    
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
    if (game.input.keyboard.isDown(SPACE)) {
      this.fire(); 
    }
  }
  
  fire() {
    const {x, y} = this.sprite;
    
    this.fire = new Fire(this.game, x + FIRE_OFFSET_X, y + FIRE_OFFSET_Y);
    console.log('fire', this.fire);
  }
}
export default Dragon;
