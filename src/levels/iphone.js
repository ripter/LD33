'use strict';

const level = {
  //background: 'bg-iphone'
  background: 'bg-iphone'
  , waypoints: {
    mainPath: [
      {x:120, y:0}
    ]
  }
  , mobs: [
    {spriteKey: 'knight', tract: 'mainPath'}
  ]
  , foreground: [
    {x: 438, y: 240, spriteKey: 'tree'}
  ]
  , balloons: [
    {x:120,y:520, spriteKey: 'balloon'}
  ]
};
export default level;
