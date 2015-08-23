/*global Phaser */
'use strict';

const Level = {
	waypoints: {
    mainPath: [
      {x:120, y:0}
      , {x:120, y:138}
      , {x:904, y:138}
      , {x:904, y:229}
      , {x:120, y:229}
      , {x:120, y:354}
      , {x:904, y:354}
      , {x:904, y:470}
      , {x:120, y:470}
      , {x:120, y:523}
      ]
    , guardPath: [
      {x: 200, y: 290}
      , {x: 1024, y: 290}
    ]
  }

	, background 	: 'background'
	, mobs: [
    // the order listed is the order they appear
    {spriteKey: 'knight', tract: 'guardPath'}
    , {spriteKey: 'knight', tract: 'guardPath'}
    , {spriteKey: 'knight', tract: 'guardPath'}

    , {spriteKey: 'knight', tract: 'mainPath'}
    , {spriteKey: 'knight', tract: 'mainPath'}
    , {spriteKey: 'king', tract: 'mainPath'}

    , {spriteKey: 'knight', tract: 'guardPath'}
    , {spriteKey: 'knight', tract: 'guardPath'}
    , {spriteKey: 'horse', tract: 'guardPath'}

    , {spriteKey: 'knight', tract: 'mainPath'}
    , {spriteKey: 'knight', tract: 'mainPath'}
    , {spriteKey: 'knight', tract: 'mainPath'}

    , {spriteKey: 'knight', tract: 'guardPath'}
    , {spriteKey: 'knight', tract: 'guardPath'}
    , {spriteKey: 'horse', tract: 'guardPath'}

    , {spriteKey: 'knight', tract: 'mainPath'}
    , {spriteKey: 'knight', tract: 'mainPath'}
    , {spriteKey: 'knight', tract: 'mainPath'}

    , {spriteKey: 'knight', tract: 'guardPath'}
    , {spriteKey: 'knight', tract: 'guardPath'}
    , {spriteKey: 'horse', tract: 'guardPath'}

    , {spriteKey: 'knight', tract: 'mainPath'}
    , {spriteKey: 'knight', tract: 'mainPath'}
    , {spriteKey: 'king', tract: 'mainPath'}
  ]

	, foreground: [
    // mainPath y: 138
    {x: 120, y: 160, spriteKey: 'wall'}
    , {x: 304, y: 160, spriteKey: 'wall'}
    , {x: 370, y: 160, spriteKey: 'wall'}

    // mainPath y: 229 
    , {x: 438, y: 240, spriteKey: 'tree'}
    , {x: 438, y: 240, spriteKey: 'tree'}
    , {x: 904, y: 240, spriteKey: 'wall'}

    // mainPath y: 354
    , {x: 638, y: 376, spriteKey: 'tree'}
    , {x: 120, y: 376, spriteKey: 'wall'}

    // mainPath y: 470
    , {x: 904, y: 490, spriteKey: 'shrub'}
    , {x: 300, y: 490, spriteKey: 'shrub'}
  ]
  , balloons: [
    {x:120,y:520, spriteKey: 'balloon'}
  ]
};

export default Level;
