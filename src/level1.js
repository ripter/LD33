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
    {x:120, y:0, spriteKey: 'king', tract: 'mainPath'}
    , {x:120, y:0, spriteKey: 'knight', tract: 'mainPath'}
    , {x:1064, y: 290, spriteKey: 'knight', tract: 'guardPath'}
    , {x:120, y:0, spriteKey: 'knight', tract: 'mainPath'}
    , {x:120, y:0, spriteKey: 'knight', tract: 'mainPath'}
    , {x:1064, y: 290, spriteKey: 'knight', tract: 'guardPath'}
  ]

	, foreground: [
			  {x:116,y:160, spriteKey: 'wall'}
      , {x:180,y:160, spriteKey: 'wall'}
      , {x:244,y:160, spriteKey: 'wall'}
      , {x:308,y:160, spriteKey: 'wall'}
      , {x:372,y:160, spriteKey: 'wall'}
      , {x:638,y:160, spriteKey: 'tree'}
      , {x:744,y:160, spriteKey: 'tree'}
      , {x:868,y:160, spriteKey: 'tree'}
      , {x:498,y:250, spriteKey: 'tree'}
      , {x:435,y:378, spriteKey: 'tree'}
      , {x:638,y:378, spriteKey: 'tree'}
      , {x:745,y:378, spriteKey: 'shrub'}
      , {x:806,y:490, spriteKey: 'shrub'}
      , {x:645,y:490, spriteKey: 'tree'}
      , {x:237,y:490, spriteKey: 'shrub'}
      , {x:120,y:374, spriteKey: 'tree'}
      , {x:900,y:482, spriteKey: 'tree'}
			]
  , balloons: [
    {x:120,y:520, spriteKey: 'balloon'}
  ]
};

export default Level;
