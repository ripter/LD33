/*global Phaser */

class Mob {

  constructor(game, x, y, img) {
    this.game 		= game;
    this.sprite 	= game.add.sprite(x, y, img);
  }
  
  update() {
    this.sprite.update();
    console.log(this.sprite.x)

    if (this.sprite.x <= 1024) {
    	this.mobRight();
    } else {
    	this.mobLeft();
    }
  }

  mobLeft() {
	this.sprite.x -= 5;
	console.log('left')
  }

  mobRight() {
	console.log('right')
	this.sprite.x += 2;
  }
}

export default Mob;
