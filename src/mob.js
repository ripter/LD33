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
    //console.log(this.game.width, this.game.height)
    this.mobRight(5);
  }

  mobLeft(x) {
  	if (x === null || x === 'undefined') {
  		this.sprite.x -= x; 
  	}
  }

  mobRight(x) {
  	if (x === null || x === 'undefined') {
  		this.sprite.x += x; 
  	}
  }
}
export default Mob;
