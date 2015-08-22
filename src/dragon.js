/*global Phaser */

class Dragon {
  constructor(game, x, y) {
    console.log('Hello World');
    this.game = game;
    this.sprite = game.add.sprite(x, y, 'dragon');
  }
  
  update() {
    this.sprite.update();
  }
}
export default Dragon;
