/*global Phaser, game, $ */
'use strict';

import * as FG from '../foreground.js';

export function addBlocker(type, group) {
  let sprite = FG.spawn(group, {x:100, y:100, spriteKey: type});
  //sprite = makeDragable(sprite, {onInputDown: setSelected});
}
