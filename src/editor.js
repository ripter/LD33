'use strict';

// Editor functions
// used by states/editor.js


// Make the sprite clickable/dragable
export function makeDragable(sprite, events) {
  sprite.inputEnabled = true;
  sprite.input.enableDrag(true);
  sprite.events.onInputDown.add(events.onInputDown);
  sprite.events.onInputUp.add(events.onInputUp);

  return sprite;
}

export function drawBox(graphics, sprite) {
  const {x, y, height, width, anchor} = sprite;

  graphics.x = x - (width * anchor.x);
  graphics.y = y;
  graphics.lineStyle(2, 0x0000FF, 1);
  graphics.drawRect(0, 0, width, -height);
  
  return graphics;
}

export function makeSelect(game, sprite) {
  const graphics = game.add.graphics(x, y);
  
  graphics.lineStyle(2, 0x0000FF, 1);
  graphics.drawRect(0, 0, width, -height);
  
  // update the box as the sprite moves
  sprite.events.onDragUpdate.add((sprite) => {
    graphics.x = sprite.x - (width/2); // offself because of anchor
    graphics.y = sprite.y;
  });
  
  sprite.selectedBox = graphics;
}

export function killSelect(game, sprite) {

}
