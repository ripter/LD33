/*global Phaser */

const SPEED = Phaser.Timer.HALF;

function Fire(game, x, y) {
  this.game = game;
  this.sprite = game.add.sprite(x, y, 'fire');
  game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

  this.sprite.body.velocity.y = -SPEED;
}
export default Fire;
