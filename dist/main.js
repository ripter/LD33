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

	var _startStateJs = __webpack_require__(9);

	var _startStateJs2 = _interopRequireDefault(_startStateJs);

	var game = new Phaser.Game(1024, 600, Phaser.AUTO, 'content');
	window.game = game;

	game.state.add('start', _startStateJs2['default']);
	game.state.add('game', _gameStateJs2['default']);

	// prod
	game.state.start('start');
	// dev
	//game.state.start('game');

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

	var _level1Js = __webpack_require__(8);

	var _level1Js2 = _interopRequireDefault(_level1Js);

	window.Mob = Mob;

	var player = undefined;
	var mobs = undefined;
	var bullets = undefined;
	var waypoints = undefined;
	var props = undefined;
	var balloons = undefined;

	function preload() {
	  game.load.image('dragon', 'assets/dragon.png', 128, 128);
	  game.load.image('king', 'assets/king.png', 64, 64);
	  game.load.image('knight', 'assets/knight.png', 64, 64);
	  game.load.image('waypoint', 'assets/waypoint.png', 24, 24);

	  game.load.image('tree', 'assets/tree.png', 64, 64);
	  game.load.image('wall', 'assets/wall.png', 64, 64);
	  game.load.image('shrub', 'assets/shrub.png', 64, 64);
	  game.load.image('balloon', 'assets/balloon.png', 64, 64);

	  game.load.spritesheet('fire', 'assets/fire_4frame_20x40.png', 20, 40);

	  game.load.image('background', 'assets/levelLayoutTest.png', 1024, 525);
	}

	function create() {
	  game.physics.startSystem(Phaser.Physics.ARCADE);

	  game.add.sprite(0, 0, _level1Js2['default'].background);

	  game.score = 0;
	  game.scoreString = 'SCORE: ';
	  game.text = game.add.text(700, 30, game.scoreString + game.score, { font: '24px Arial' });

	  // Setup groups!
	  window.bullets = bullets = (0, _groupsJs.createGroup)();
	  window.player = player = (0, _dragonJs.spawnDragon)(500, 500);

	  window.waypoints = waypoints = (0, _levelLoaderJs.spawnWaypoints)(_level1Js2['default'].waypoints);
	  window.mobs = mobs = (0, _levelLoaderJs.spawnSprites)(_level1Js2['default'].mobs);
	  window.props = props = (0, _levelLoaderJs.spawnProps)(_level1Js2['default'].props);

	  // these mobs follow these waypoints
	  Mob.run(mobs, waypoints);

	  // start a mob moving
	  //Mob.moveToPoint(mobs.children[0], waypoints.children[2]);
	}

	function score() {}

	function updateScore() {
	  game.score++;
	  console.log('score', game.score);
	  game.text.text = game.scoreString + game.score;
	}

	function update() {
	  game.physics.arcade.collide(bullets, mobs, collideBulletMob);
	  game.physics.arcade.collide(bullets, props, collideBulletProp);
	  game.physics.arcade.collide(mobs, waypoints, collideWaypoint);

	  (0, _playerJs.playerControl)(player);
	}

	function collideBulletProp(bullet, prop) {
	  // kill the bullet
	  bullet.kill();
	}

	function collideBulletMob(bullet, mob) {
	  console.log('collideBulletMob', bullet, mob);
	  updateScore();
	  bullet.kill();
	  mob.kill();
	}

	function collideWaypoint(mob, waypoint) {
	  var lastIndex = waypoint.index;
	  var nextIndex = lastIndex + 1;
	  var nextWaypoint = waypoints.children[nextIndex];

	  console.log('collideWaypoint', mob, waypoint);
	  Mob.moveToPoint(mob, nextWaypoint);

	  // move to the next one!
	  // How get next waypoint for mob??
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
	exports.createGroup = createGroup;

	function createGroup() {
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
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	/*global Phaser, game */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.moveToPoint = moveToPoint;
	exports.run = run;
	var DELAY = Phaser.Timer.SECOND * 5;
	var SPEED = 100; //Phaser.Timer.MINUTE * 4;

	function moveToPoint(sprite, waypoint) {
	  var x = waypoint.x;
	  var y = waypoint.y;

	  console.log('waypoint', x, y);
	  sprite.waypointIndex = waypoint.index;
	  game.physics.arcade.accelerateToXY(sprite, x, y, SPEED);
	}

	function run(group, waypoints) {
	  var offscreen = waypoints.children[0];
	  var onscreen = waypoints.children[1];
	  var index = 0;

	  game.time.events.repeat(DELAY, group.length, function () {
	    var child = group.children[index];

	    // init offscreen
	    child.x = offscreen.x;
	    child.y = offscreen.y;

	    // move to the first onscreen point
	    moveToPoint(child, onscreen);

	    // work our why thought the list.
	    index += 1;
	  });
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*global Phaser, game, bullets */
	'use strict';

	// Groups with physics.
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.spawnWaypoints = spawnWaypoints;
	exports.spawnProps = spawnProps;
	exports.spawnSprites = spawnSprites;

	var _groupsJs = __webpack_require__(2);

	// create a group of waypoints that exist at [{x,y} ...]

	function spawnWaypoints(points) {
	  var group = (0, _groupsJs.createGroup)();

	  points.forEach(function (point, index) {
	    var sprite = group.create(point.x, point.y, 'waypoint');
	    sprite.anchor = { x: .5, y: 1 };
	    sprite.body.immovable = true;

	    // set our stuff
	    sprite.index = index;
	  });

	  return group;
	}

	function spawnProps(list) {
	  var group = spawnSprites(list);

	  group.setAll('body.immovable', true);

	  return group;
	}

	function spawnSprites(list) {
	  var group = (0, _groupsJs.createGroup)();

	  list.forEach(function (point) {
	    var sprite = group.create(point.x, point.y, point.spriteKey);
	    sprite.anchor = { x: .5, y: 1 };
	  });

	  return group;
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	/*global Phaser */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
					value: true
	});
	var Level = {
					waypoints: [{ x: 120, y: 0 }, { x: 120, y: 138 }, { x: 904, y: 138 }, { x: 904, y: 229 }, { x: 120, y: 229 }, { x: 120, y: 354 }, { x: 904, y: 354 }, { x: 904, y: 470 }, { x: 120, y: 470 }, { x: 120, y: 523 }],

					background: 'background',
					mobs: [{ x: 120, y: 0, spriteKey: 'king' }, { x: 120, y: 0, spriteKey: 'knight' }],

					props: [{ x: 116, y: 160, spriteKey: 'wall' }, { x: 180, y: 160, spriteKey: 'wall' }, { x: 244, y: 160, spriteKey: 'wall' }, { x: 308, y: 160, spriteKey: 'wall' }, { x: 372, y: 160, spriteKey: 'wall' }, { x: 638, y: 160, spriteKey: 'tree' }, { x: 744, y: 160, spriteKey: 'tree' }, { x: 868, y: 160, spriteKey: 'tree' }, { x: 498, y: 250, spriteKey: 'tree' }, { x: 435, y: 378, spriteKey: 'tree' }, { x: 638, y: 378, spriteKey: 'tree' }, { x: 745, y: 378, spriteKey: 'shrub' }, { x: 806, y: 490, spriteKey: 'shrub' }, { x: 645, y: 490, spriteKey: 'tree' }, { x: 237, y: 490, spriteKey: 'shrub' }, { x: 120, y: 520, spriteKey: 'balloon' }]
	};

	exports['default'] = Level;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*global Phaser, game */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _fontsJs = __webpack_require__(10);

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
	    console.log('AHHHHHHHHHHHH');
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
/* 10 */
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

/***/ }
/******/ ]);