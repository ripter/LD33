/*global $ */

import * as FG from '../foreground.js';

// UI controls for the editor
import templateSelect from './select.mustache';

const UI_SELECTOR = '#ui';


export function createUI() {
  const elmRoot = $(UI_SELECTOR);
  const elmForeground = elmRoot.find();
  
  renderSelect('.js-foreground', {
    list: Object.keys(FG.TYPES).map(fromConstants(FG.TYPES))
    , label: 'Foreground'
  });
  
  bindSelect('.js-foreground', (value, target) => {
    debugger;
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

