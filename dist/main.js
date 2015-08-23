/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*global Phaser */
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _gameStateJs = __webpack_require__(1);

	var _gameStateJs2 = _interopRequireDefault(_gameStateJs);

	var _startStateJs = __webpack_require__(10);

	var _startStateJs2 = _interopRequireDefault(_startStateJs);

	var _endStateJs = __webpack_require__(12);

	var _endStateJs2 = _interopRequireDefault(_endStateJs);

	var game = new Phaser.Game(1024, 600, Phaser.AUTO, 'content');
	window.game = game;

	game.state.add('start', _startStateJs2['default']);
	game.state.add('game', _gameStateJs2['default']);
	game.state.add('end', _endStateJs2['default']);

	// prod
	//game.state.start('start');
	// dev
	game.state.start('game');

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*global Phaser, game */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _groupsJs = __webpack_require__(2);

	var _dragonJs = __webpack_require__(3);

	var _playerJs = __webpack_require__(5);

	var _mobJs = __webpack_require__(6);

	var Mob = _interopRequireWildcard(_mobJs);

	var _levelLoaderJs = __webpack_require__(7);

	var _level1Js = __webpack_require__(9);

	var _level1Js2 = _interopRequireDefault(_level1Js);

	window.Mob = Mob;

	var level = undefined;

	var player = undefined;
	var bullets = undefined;
	var balloons = undefined;

	function preload() {
	  game.load.image('dragon', 'assets/dragon.png', 128, 128);
	  game.load.image('king', 'assets/king.png', 64, 64);
	  game.load.image('knight', 'assets/knight.png', 64, 64);
	  //game.load.image('waypoint', 'assets/waypoint_20x20.png', 24, 24);
	  game.load.image('waypoint', 'assets/waypoint_10x10.png', 10, 10);

	  game.load.image('tree', 'assets/tree.png', 64, 64);
	  game.load.image('wall', 'assets/wall.png', 64, 64);
	  game.load.image('shrub', 'assets/shrub.png', 64, 64);
	  game.load.image('balloon', 'assets/balloon.png', 64, 64);

	  game.load.spritesheet('fire', 'assets/fire_4frame_20x40.png', 20, 40);

	  game.load.image('background', 'assets/levelLayoutTest.png', 1024, 525);
	}

	function create() {
	  game.physics.startSystem(Phaser.Physics.ARCADE);

	  game.currentScore = 0;
	  game.storedScore = [];
	  game.scoreString = 'SCORE: ';
	  game.text = game.add.text(700, 30, game.scoreString + game.currentScore, { font: '24px Arial' });

	  // load level!
	  window.level = level = (0, _levelLoaderJs.loadLevel)(_level1Js2['default']);
	  window.bullets = bullets = (0, _groupsJs.physicsGroup)();
	  window.player = player = (0, _dragonJs.spawnDragon)(500, 500);

	  Mob.startTimedGame(level.mobs);

	  /*
	  // Setup groups!
	    window.waypoints = waypoints = spawnWaypoints(lvl1.waypoints);
	  window.mobs = mobs = spawnMobs(lvl1.mobs);
	  window.props = props = spawnProps(lvl1.props);
	    // these mobs follow these waypoints
	  Mob.loadTracts(mobs, waypoints, lvl1.waypoints);
	  Mob.run(mobs, waypoints);
	   // start a mob moving
	  //Mob.moveToPoint(mobs.children[0], waypoints.children[2]);
	  */
	}

	function update() {
	  var _level = level;
	  var mobs = _level.mobs;
	  var fgGroup = _level.fgGroup;

	  (0, _playerJs.playerControl)(player);
	  Mob.update(level.mobs);

	  game.physics.arcade.collide(bullets, mobs.group, collideBulletMob);
	  game.physics.arcade.collide(bullets, fgGroup, collideBulletProp);
	}

	function updateScore() {

	  game.currentScore++;
	  console.log('scores', game.currentScore);
	  game.text.text = game.scoreString + game.currentScore;
	  localStorage.setItem('current', game.currentScore);
	}

	function collideBulletProp(bullet, prop) {
	  // kill the bullet
	  bullet.kill();
	}

	function collideBulletMob(bullet, mob) {
	  updateScore();
	  bullet.kill();
	  mob.kill();
	}

	exports['default'] = {
	  preload: preload,
	  create: create,
	  update: update
	};
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*global Phaser, game */
	'use strict';

	// create new group with physics!!
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.physicsGroup = physicsGroup;

	function physicsGroup() {
	  var group = game.add.group();
	  group.enableBody = true;
	  group.physicsBodyType = Phaser.Physics.ARCADE;
	  return group;
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*global Phaser, game */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.spawnDragon = spawnDragon;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _fireJs = __webpack_require__(4);

	var _fireJs2 = _interopRequireDefault(_fireJs);

	function spawnDragon(x, y) {
	  var sprite = game.add.sprite(x, y, 'dragon');
	  game.physics.enable(sprite, Phaser.Physics.ARCADE);

	  sprite.health = 3;
	  return sprite;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	/*global Phaser, game, bullets */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.spawnFire = spawnFire;
	var SPEED = 300;
	var OFFSET_Y = 0;
	var OFFSET_X = 50;

	// totally not a constructor
	// constructors use NEW, we use SPAWN. Totally different! :)

	function spawnFire(x, y) {
	  var sprite = bullets.create(x + OFFSET_X, y + OFFSET_Y, 'fire');

	  sprite.animations.add('fly');
	  sprite.animations.play('fly', 24, true);
	  sprite.body.velocity.y = -SPEED;
	  return sprite;
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*global Phaser, game*/
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.playerControl = playerControl;

	var _fireJs = __webpack_require__(4);

	var FIRE_SPEED = Phaser.Timer.HALF;
	var SPEED = 100;

	var canFire = true;

	function playerControl(sprite) {
	  var _Phaser$Keyboard = Phaser.Keyboard;
	  var LEFT = _Phaser$Keyboard.LEFT;
	  var RIGHT = _Phaser$Keyboard.RIGHT;
	  var SPACEBAR = _Phaser$Keyboard.SPACEBAR;
	  var ESC = _Phaser$Keyboard.ESC;

	  // Movement keys
	  if (game.input.keyboard.isDown(LEFT)) {
	    sprite.body.velocity.x = -SPEED;
	  } else if (game.input.keyboard.isDown(RIGHT)) {
	    sprite.body.velocity.x = SPEED;
	  } else {
	    sprite.body.velocity.x = 0;
	  }

	  // FIRE!!!
	  if (canFire && game.input.keyboard.isDown(SPACEBAR)) {
	    canFire = false;
	    (0, _fireJs.spawnFire)(sprite.x, sprite.y);

	    // Delay the firing
	    game.time.events.add(FIRE_SPEED, function () {
	      canFire = true;
	    });
	  }

	  // DEBUG
	  if (game.input.keyboard.isDown(ESC)) {
	    console.log('rose is: ', game.rose);
	  }
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	/*global Phaser, game */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.spawn = spawn;
	exports.startTimedGame = startTimedGame;
	exports.update = update;
	exports.moveToPoint = moveToPoint;
	exports.moveToWaypoint_OLD = moveToWaypoint_OLD;
	exports.run = run;
	exports.checkWaypoints = checkWaypoints;
	exports.loadTracts = loadTracts;
	var DELAY = Phaser.Timer.SECOND * 1;
	var SPEED = 100; //Phaser.Timer.MINUTE * 4;
	var HIT_RANGE = 5;

	// Spawn a new sprite in the group.

	function spawn(group, data) {
	  var x = data.x;
	  var y = data.y;
	  var spriteKey = data.spriteKey;

	  var sprite = group.create(x, y, spriteKey);

	  sprite.alive = false;
	  sprite.anchor = { x: .5, y: 1 };
	  sprite.data = data;

	  return sprite;
	}

	// start the timed game

	function startTimedGame(mobData) {
	  var list = mobData.list;
	  var group = mobData.group;

	  var length = group.length;
	  var index = 0;

	  // 'spawn' one human at a time with a time delay
	  game.time.events.repeat(DELAY, length, function () {
	    var mob = group.getAt(index);

	    mob.alive = true;
	    mob.tractIndex = -1;

	    moveToNextWaypoint(mob);

	    // work our why thought the list.
	    index += 1;
	  });
	}

	// Start the mob moving to the next waypoint
	function moveToNextWaypoint(sprite) {
	  var tract = sprite.data.tract;
	  var nextIndex = sprite.tractIndex + 1;

	  if (nextIndex === tract.length) {
	    // loop back.
	    nextIndex = 0;
	  }

	  var _tract$nextIndex = tract[nextIndex];
	  var x = _tract$nextIndex.x;
	  var y = _tract$nextIndex.y;

	  sprite.tractIndex = nextIndex;
	  game.physics.arcade.moveToXY(sprite, x, y, SPEED);
	}

	// collision checks

	function update(mobData) {
	  var group = mobData.group;

	  group.forEachAlive(function (sprite) {
	    var tract = sprite.data.tract;
	    var index = sprite.tractIndex;
	    var _tract$index = tract[index];
	    var x = _tract$index.x;
	    var y = _tract$index.y;

	    var dist = game.physics.arcade.distanceToXY(sprite, x, y);

	    if (dist <= HIT_RANGE) {
	      moveToNextWaypoint(sprite);
	    }
	  });
	}

	//
	// --------------
	//

	function moveToPoint(sprite, waypoint) {
	  var x = waypoint.x;
	  var y = waypoint.y;
	  var tract = waypoint.tract;
	  var index = waypoint.index;

	  debugger;
	  sprite.waypointIndex = index;
	  sprite.nextWaypoint = tract[index + 1];
	  game.physics.arcade.moveToXY(sprite, x, y, SPEED);
	}

	function moveToWaypoint_OLD(mob, index) {
	  var tract = mob.tract;
	  var nextIndex = index + 1;
	  var _tract$nextIndex2 = tract[nextIndex];
	  var x = _tract$nextIndex2.x;
	  var y = _tract$nextIndex2.y;

	  mob.tractIndex = nextIndex;
	  game.physics.arcade.moveToXY(mob, x, y, SPEED);
	}

	function run(mobs, waypoints) {
	  var index = 0;

	  // 'spawn' one human at a time with a time delay
	  game.time.events.repeat(DELAY, mobs.length, function () {
	    var mob = mobs.getAt(index);

	    mob.alive = true;
	    // move to the first onscreen point
	    moveToWaypoint(mob, 0);

	    // work our why thought the list.
	    index += 1;
	  });
	}

	function checkWaypoints(group, waypoints) {
	  group.forEachAlive(function (mob) {
	    var tract = mob.tract;
	    var index = mob.tractIndex;
	    var _tract$index2 = tract[index];
	    var x = _tract$index2.x;
	    var y = _tract$index2.y;

	    var dist = game.physics.arcade.distanceToXY(mob, x, y);

	    console.log('dist', dist);
	    if (dist <= HIT_RANGE) {
	      moveToWaypoint(mob, index + 1);
	    }
	  });
	}

	function loadTracts(mobs, waypoints, lvlWaypoints) {
	  //uhhhhhhh, just do it the stupid way
	  mobs.forEach(function (mob) {
	    var tractName = mob.tractName;
	    var tract = lvlWaypoints[tractName];

	    mob.tract = tract;
	    mob.tractIndex = 0;
	  });
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*global Phaser, game, bullets */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.loadLevel = loadLevel;
	exports.spawnWaypoints = spawnWaypoints;
	exports.spawnProps = spawnProps;
	exports.spawnMobs = spawnMobs;
	exports.spawnSprites = spawnSprites;

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _mobJs = __webpack_require__(6);

	var Mob = _interopRequireWildcard(_mobJs);

	var _foregroundJs = __webpack_require__(8);

	var Foreground = _interopRequireWildcard(_foregroundJs);

	// Groups with physics.

	var _groupsJs = __webpack_require__(2);

	// Load the level from a lvl object.

	function loadLevel(lvl) {
	  // These are in order by z-index
	  var background = game.add.image(0, 0, lvl.background);
	  var mobList = loadMobList(lvl.mobs, lvl.waypoints);
	  var mobGroup = spawnMobGroup(mobList);
	  var fgGroup = spawnForegroundGroup(lvl.foreground);

	  return {
	    background: background,
	    mobs: {
	      list: mobList,
	      group: mobGroup
	    },
	    fgGroup: fgGroup
	  };
	}

	// Join the mob with the tract data.
	// this way every mob knows their entire tract
	function loadMobList(lvlMobs, lvlWaypoints) {
	  return lvlMobs.map(function (lvlMob) {
	    var tractName = lvlMob.tract;

	    lvlMob.tractName = tractName;
	    lvlMob.tract = lvlWaypoints[tractName];
	    return lvlMob;
	  });
	}

	function spawnMobGroup(mobList) {
	  var group = (0, _groupsJs.physicsGroup)();

	  mobList.forEach(function (data) {
	    var sprite = Mob.spawn(group, data);
	  });

	  return group;
	}

	function spawnForegroundGroup(foregroundList) {
	  var group = (0, _groupsJs.physicsGroup)();

	  foregroundList.forEach(function (data) {
	    var sprite = Foreground.spawn(group, data);
	  });

	  return group;
	}

	//
	// ---------------------------
	//

	// create a group of waypoints that exist at [{x,y} ...]

	function spawnWaypoints(lvlData) {
	  var group = game.add.group();

	  Object.keys(lvlData).forEach(function (name) {
	    var tract = lvlData[name];

	    tract.forEach(function (point, index) {
	      var sprite = group.create(point.x, point.y, 'waypoint');
	      sprite.anchor = { x: .5, y: 1 };

	      // set our stuff
	      sprite.waypointIndex = index;
	      sprite.tract = tract;
	      sprite.tractName = name;
	    });
	  });

	  return group;
	}

	function spawnProps(list) {
	  var group = spawnSprites(list);

	  group.setAll('body.immovable', true);

	  return group;
	}

	function spawnMobs(list) {
	  var group = spawnSprites(list);

	  group.forEach(function (mob) {
	    mob.tractName = mob.data.tract;
	    mob.waypointIndex = 0;
	    mob.alive = false;
	  });

	  return group;
	}

	function spawnSprites(list) {
	  var group = createGroup();

	  list.forEach(function (point) {
	    var sprite = group.create(point.x, point.y, point.spriteKey);
	    sprite.anchor = { x: .5, y: 1 };
	    sprite.data = point;
	  });

	  return group;
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	/*global Phaser, game */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.spawn = spawn;

	function spawn(group, data) {
	  var x = data.x;
	  var y = data.y;
	  var spriteKey = data.spriteKey;

	  var sprite = group.create(x, y, spriteKey);

	  sprite.anchor = { x: .5, y: 1 };
	  sprite.data = data;
	  sprite.body.immovable = true;

	  return sprite;
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	/*global Phaser */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var Level = {
	  waypoints: {
	    mainPath: [{ x: 120, y: 0 }, { x: 120, y: 138 }, { x: 904, y: 138 }, { x: 904, y: 229 }, { x: 120, y: 229 }, { x: 120, y: 354 }, { x: 904, y: 354 }, { x: 904, y: 470 }, { x: 120, y: 470 }, { x: 120, y: 523 }],
	    guardPath: [{ x: 904, y: 229 }, { x: 904, y: 470 }]
	  },

	  background: 'background',
	  mobs: [{ x: 120, y: 0, spriteKey: 'king', tract: 'mainPath' }, { x: 120, y: 0, spriteKey: 'knight', tract: 'mainPath' }, { x: 904, y: 0, spriteKey: 'knight', tract: 'guardPath' }],

	  foreground: [{ x: 116, y: 160, spriteKey: 'wall' }, { x: 180, y: 160, spriteKey: 'wall' }, { x: 244, y: 160, spriteKey: 'wall' }, { x: 308, y: 160, spriteKey: 'wall' }, { x: 372, y: 160, spriteKey: 'wall' }, { x: 638, y: 160, spriteKey: 'tree' }, { x: 744, y: 160, spriteKey: 'tree' }, { x: 868, y: 160, spriteKey: 'tree' }, { x: 498, y: 250, spriteKey: 'tree' }, { x: 435, y: 378, spriteKey: 'tree' }, { x: 638, y: 378, spriteKey: 'tree' }, { x: 745, y: 378, spriteKey: 'shrub' }, { x: 806, y: 490, spriteKey: 'shrub' }, { x: 645, y: 490, spriteKey: 'tree' }, { x: 237, y: 490, spriteKey: 'shrub' }, { x: 120, y: 374, spriteKey: 'tree' }, { x: 900, y: 482, spriteKey: 'tree' }, { x: 120, y: 520, spriteKey: 'balloon' }]
	};

	exports['default'] = Level;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*global Phaser, game */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _fontsJs = __webpack_require__(11);

	//
	// Lifecycle
	//
	function preload() {}

	function create() {
	  game.add.text(100, 100, 'You are dragon.', _fontsJs.headerFont);
	  game.add.text(100, 200, 'Win dragon lady friend a stuffed princess.', _fontsJs.headerFont);
	  game.add.text(100, 300, 'Press Space NOW!!!', _fontsJs.headerFont);
	}

	function update() {
	  var SPACEBAR = Phaser.Keyboard.SPACEBAR;

	  if (game.input.keyboard.isDown(SPACEBAR)) {
	    game.rose = 'a puppy';
	    game.state.start('game');
	  }
	}
	exports['default'] = {
	  preload: preload,
	  create: create,
	  update: update
	};
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports) {

	/*global Phaser, game */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var headerFont = {
	  font: '20pt Georgia',
	  fill: '#fff'
	};
	exports.headerFont = headerFont;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/*global Phaser, game */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _fontsJs = __webpack_require__(11);

	var _gameStateJs = __webpack_require__(1);

	//
	// Lifecycle
	//
	function preload() {
	  game.currentScore = JSON.parse(localStorage.getItem('current'));
	  // game.storedScore = JSON.parse(localStorage.getItem('scores'));
	}

	function create() {
	  game.add.text(100, 100, 'You are Monster END!', _fontsJs.headerFont);
	  game.add.text(100, 150, 'Press Space NOW!!!', _fontsJs.headerFont);
	  game.add.text(100, 200, 'Your score: ' + game.currentScore, _fontsJs.headerFont);
	}

	function update() {
	  var SPACEBAR = Phaser.Keyboard.SPACEBAR;

	  if (game.input.keyboard.isDown(SPACEBAR)) {
	    game.state.start('game');
	  }
	}

	// function scoreList() {
	// 	if(game.storedScore === null){

	// 		game.storedScore = []
	// 	}

	// 	game.storedScore.unshift(game.currentScore);

	//   if (game.storedScore.legth > 5) {
	//     game.storedScore.pop();
	//   }
	//   localStorage.setItem('scores', game.storedScore);
	// }

	exports['default'] = {
	  preload: preload,
	  create: create,
	  update: update
	};
	module.exports = exports['default'];

/***/ }
/******/ ]);