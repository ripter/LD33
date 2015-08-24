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
      {x: 1024, y: 290}
      , {x: 200, y: 290}
    ]
    , horsePath: [
      {x: 1024, y: 290}
      , {x: 200, y: 290}
      , {x: 120, y: 290}
      , {x:120, y:354}
      , {x:904, y:354}
      , {x:904, y:470}
      , {x:120, y:470}
      , {x:120, y:523}
    ]
  }

	, background 	: 'background'
	, mobs: [
    // the order listed is the order they appear
    {spriteKey: 'knight', tract: 'guardPath'}
    , {spriteKey: 'knight', tract: 'guardPath'}
    , {spriteKey: 'knight', tract: 'guardPath'}
    , {spriteKey: 'horse', tract: 'horsePath', speed: 250}

    , {spriteKey: 'knight', tract: 'mainPath'}
    , {spriteKey: 'knight', tract: 'mainPath'}
    , {spriteKey: 'horse', tract: 'mainPath', speed: 260, points: 2}
    , {spriteKey: 'knight', tract: 'mainPath'}
    , {spriteKey: 'horse', tract: 'mainPath', speed: 260, points: 2}
    , {spriteKey: 'king', tract: 'mainPath', speed: 90, points: 3}

    , {spriteKey: 'knight', tract: 'guardPath', speed: 150}
    , {spriteKey: 'knight', tract: 'guardPath', speed: 150}
    , {spriteKey: 'horse', tract: 'horsePath', speed: 250}
    , {spriteKey: 'horse', tract: 'horsePath', speed: 250}

    , {spriteKey: 'knight', tract: 'mainPath'}
    , {spriteKey: 'knight', tract: 'mainPath'}
    , {spriteKey: 'horse', tract: 'mainPath', speed: 200, points: 2}
    , {spriteKey: 'horse', tract: 'mainPath', speed: 250, points: 2}
    , {spriteKey: 'knight', tract: 'mainPath'}
    , {spriteKey: 'horse', tract: 'mainPath', speed: 260, points: 2}
    , {spriteKey: 'knight', tract: 'mainPath'}

    , {spriteKey: 'knight', tract: 'guardPath'}
    , {spriteKey: 'knight', tract: 'guardPath', speed: 150}
    , {spriteKey: 'knight', tract: 'guardPath', speed: 150}
    , {spriteKey: 'horse', tract: 'horsePath', speed: 250}


    , {spriteKey: 'knight', tract: 'mainPath', speed: 150}
    , {spriteKey: 'knight', tract: 'mainPath', speed: 150}
    , {spriteKey: 'knight', tract: 'mainPath', speed: 150}
    , {spriteKey: 'horse', tract: 'mainPath', speed: 270, points: 2}
    , {spriteKey: 'knight', tract: 'mainPath', speed: 150}
    , {spriteKey: 'knight', tract: 'mainPath', speed: 150}
    , {spriteKey: 'knight', tract: 'mainPath', speed: 150}

    , {spriteKey: 'knight', tract: 'horsePath'}
    , {spriteKey: 'horse', tract: 'horsePath', speed: 250, points: 2}
    , {spriteKey: 'knight', tract: 'horsePath'}
    , {spriteKey: 'knight', tract: 'horsePath'}
    , {spriteKey: 'horse', tract: 'horsePath', speed: 250, points: 2}

    , {spriteKey: 'knight', tract: 'mainPath', speed: 150}
    , {spriteKey: 'knight', tract: 'mainPath'}
    , {spriteKey: 'knight', tract: 'mainPath', speed: 150}
    , {spriteKey: 'knight', tract: 'mainPath', speed: 150}
    , {spriteKey: 'horse', tract: 'mainPath', speed: 250, points: 2}
    , {spriteKey: 'king', tract: 'mainPath', speed: 120, points: 3}
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
    , {x: 155, y: 300, spriteKey: 'tower'}

    // mainPath y: 470
    , {x: 904, y: 490, spriteKey: 'shrub'}
    , {x: 300, y: 490, spriteKey: 'shrub'}
  ]
  , balloons: [
    {x:120,y:520, spriteKey: 'balloon'}
  ]
};

export default Level;
