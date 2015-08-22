/*global Phaser */

class Mob {
  constructor(game, x, y, img) {
    this.game = game;
    this.sprite = game.add.sprite(x, y, img);
  }
  
  update() {
    this.sprite.update();
  }
}
export default Mob;
