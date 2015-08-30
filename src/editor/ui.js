/*global Phaser, game, $ */

import * as FG from '../foreground.js';
import {exportLevel} from '../level-loader.js';

// UI controls for the editor
import templateSelect from './select.mustache';

const UI_SELECTOR = '#ui';
const ADD_SPEED = Phaser.Timer.HALF;

let selectedSprite = null;
let boxGraphics = null;
let level = null;

// Create a new UI
export function createUI(levelData) {
  const elmRoot = $(UI_SELECTOR);
  const elmForeground = elmRoot.find();
  
  level = levelData;
  boxGraphics = game.add.graphics(0, 0);

  createQuickbar();
  createForeground(level);
}

//
// Update the UI
export function update() {
  if (selectedSprite) {
    drawBox(boxGraphics, selectedSprite);
  }
}


function createForeground(level) {
  const selector = '.js-foreground';
  let canAdd = true;
  let sprite;

  level.fgGroup.forEach(makeDragable, this, true, {
    onInputDown: setSelected
  });

  renderSelect(selector, {
    list: Object.keys(FG.TYPES).map(fromConstants(FG.TYPES))
    , label: 'Foreground'
  });
  
  bindSelect(selector, (type, target) => {
    if (!canAdd) { return; }
    canAdd = false;

    sprite = FG.spawn(level.fgGroup, {x:100, y:100, spriteKey: type}); 
    sprite = makeDragable(sprite, {onInputDown: setSelected});
    selectedSprite = sprite;
    
    game.time.events.add(ADD_SPEED, () => {
      canAdd = true;
    });
  });

}

function createQuickbar() {
  const elmDelete = $(UI_SELECTOR).find('.js-selected-delete');
  const elmDownload = $(UI_SELECTOR).find('.js-download');
  
  elmDelete.bind('click', (evt) => {
    selectedSprite.destroy();
    selectedSprite = null;
  });
  
  elmDownload.bind('click', (evt) => {
    const lvlData = exportLevel(level);   
    
    console.log(JSON.stringify(lvlData, null, '  '));
  });
}


function fromConstants(constants) {
  return (key) => {
    return {
      key: key
      , value: constants[key]
    };
  };
}


function renderSelect(selector, data) {
  const elm = $(selector);
  const template = templateSelect; 

  elm.html(template(data));
  return elm;
}

function bindSelect(selector, handleChange) {
  const elm = $(selector).find('a');
  
  elm.bind('click', (evt) => {
    const target = evt.target;
    const value = target.dataset.value;

    handleChange(value, target);
  });
}


function setSelected(sprite) {
  return window.selectedSprite = selectedSprite = sprite;
}

function drawBox(graphics, sprite) {
  const {x, y, height, width, anchor} = sprite;

  graphics.x = x - (width * anchor.x);
  graphics.y = y;
  graphics.lineStyle(2, 0x0000FF, 1);
  graphics.drawRect(0, 0, width, -height);
  
  return graphics;
}

// Make the sprite clickable/dragable
function makeDragable(sprite, events) {
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
