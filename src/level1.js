/*global Phaser */
'use strict';

const Level = {
	waypoints 		: [
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

	, background 	: 'background'
	, mobs 			: [{spriteKey: 'king'}
					, {spriteKey: 'knight'}]
					
	, props 		: [
			{x:100,y:100, spriteKey:'tree'}
			, {x:0,y:0, spriteKey: 'tree'}
			, {x:0,y:0, spriteKey: 'tree'}
			, {x:0,y:50, spriteKey: 'wall'}
			]
};

export default Level;
