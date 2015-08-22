/*global Phaser */

class Mob {

  constructor(game, x, y, img) {
    this.game 	= game;
    this.sprite = game.add.sprite(x, y, img);

    // PHYSICS!!!!!
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
  }
  
  update() {
    this.sprite.update();
    	console.log(this.game.physics);
	}

  mobLeft() {
	this.sprite.x -= 5;
  }

  mobRight() {
	this.sprite.x += 2;
  }
}

export default Mob;
