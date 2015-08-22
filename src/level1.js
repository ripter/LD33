/*global Phaser */
'use strict';

const Level = {
	waypoints 		: [{x:120, y:0}, {x:120, y:138}, {x:904, y:138}, {x:904, y:229}, {x:120, y:229}, {x:120, y:354}, {x:904, y:354}, {x:904, y:470}, {x:120, y:470}, {x:120, y:523}]
	, background 	: 'level-1'
	, mobs 			: [{'king'}, {'knight'}]
	, props 		: [{x,y,'bush'}, {x,y,'bush'}, {x,y,'bush'}, {x,y,'fence'}]
}

export default Level;