/*global Phaser */

class Mob {

  constructor(game, x, y, img) {
<<<<<<< HEAD
    this.game 		= game;
    this.sprite 	= game.add.sprite(x, y, img);
=======
    this.game 	= game;
    this.sprite = game.add.sprite(x, y, img);

    // PHYSICS!!!!!
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
>>>>>>> 03617bb29fd338b88b9511417719e8d6c4016069
  }
  
  update() {
    this.sprite.update();
<<<<<<< HEAD
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
=======
    	console.log(this.game.physics);
	}

  mobLeft() {
	this.sprite.x -= 5;
  }

  mobRight() {
>>>>>>> 03617bb29fd338b88b9511417719e8d6c4016069
	this.sprite.x += 2;
  }
}

export default Mob;
