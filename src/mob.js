/*global Phaser */
'use strict';

function Mob(game, x, y, imageCache) {
  this.game 	= game;
  this.sprite = game.add.sprite(x, y, imageCache);
  game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
  this.sprite.host = this;
}
Mob.prototype = {
  update() {
    this.game.physics.arcade.moveToPoint(this.sprite, lvl1.waypoints, Phaser.Timer.SECOND);
	}


};
export default Mob;
