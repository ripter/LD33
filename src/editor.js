'use strict';

// Editor functions
// used by states/editor.js


// Make the sprite clickable/dragable
export function makeDragable(sprite, events) {
  sprite.inputEnabled = true;
  sprite.input.enableDrag(true);
  
  if (events.onInputDown) {
    sprite.events.onInputDown.add(events.onInputDown);
  }
  
  if (events.onInputUp) {
    sprite.events.onInputUp.add(events.onInputUp);
  }

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
