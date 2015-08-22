/*global Phaser */

const SPEED = Phaser.Timer.HALF;
const SPRITE_CACHE = 'fire';

class Fire {
  constructor(game, x, y) {
    this.game = game;
    this.sprite = game.add.sprite(x, y, SPRITE_CACHE);
    // PHYSICS!!!!!
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
  }
  
  update() {
    this.sprite.body.velocity.y = -SPEED;
  }
}
export default Fire;
