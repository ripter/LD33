/*global Phaser */

const SPEED = Phaser.Timer.HALF;
const SPRITE_CACHE = 'fire';

class Fire {
  constructor(game, sprite) {
    this.game = game;
    this.sprite = sprite;
    // PHYSICS!!!!!
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    
    // Start it flying!
    //this.sprite.body.velocity.y = -SPEED;
  }
  
  update() {
  }
}
export default Fire;
