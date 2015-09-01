'use strict';

const level = {
  //background: 'bg-iphone'
  background: 'bg-iphone'
  , waypoints: {
    mainPath: [
      {x:0, y:50}
      , {x:273, y:55}
      , {x:0, y:142}
      , {x:185, y:164}
      , {x:61, y:230}
      , {x:275, y:275}
      , {x:60, y:383}
    ]
    , altPath: [
      {x:604, y:0}
      , {x:577, y:56}
      , {x:357, y:57}
      , {x:306, y:101}
      , {x:284, y:145}
      , {x:285, y:193}
      , {x:305, y:229}
      , {x:346, y:264}
      , {x:582, y:256}
      , {x:621, y:342}
    ]
  }
  , mobs: [
    {spriteKey: 'knight', tract: 'mainPath'}
    , {spriteKey: 'knight', tract: 'altPath'}
  ]
  , foreground: [
    {x: 438, y: 240, spriteKey: 'tree'}
  ]
  , balloons: [
    {x:500,y:342, spriteKey: 'balloon'}
  ]
};
export default level;
