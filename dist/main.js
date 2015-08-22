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

	var _groupsJs = __webpack_require__(1);

	var _dragonJs = __webpack_require__(2);

	var _playerJs = __webpack_require__(4);

	var _levelLoaderJs = __webpack_require__(5);

	var _level1Js = __webpack_require__(6);

	var _level1Js2 = _interopRequireDefault(_level1Js);

	var player = undefined;
	var mobs = undefined;
	var bullets = undefined;
	var waypoints = undefined;
	var props = undefined;

	var game = new Phaser.Game(1024, 600, Phaser.AUTO, 'content', {
	  preload: preload,
	  create: create,
	  update: update
	});
	window.game = game;

	function preload() {
	  game.load.image('dragon', 'assets/dragon.png', 128, 128);
	  game.load.image('king', 'assets/king.png', 64, 64);
	  game.load.image('knight', 'assets/knight.png', 64, 64);
	  game.load.image('fire', 'assets/fire.png', 64, 64);
	  game.load.image('waypoint', 'assets/waypoint.png', 24, 24);

	  game.load.image('tree', 'assets/tree.png', 64, 64);
	  game.load.image('wall', 'assets/wall.png', 64, 64);

	  game.load.image('background', 'assets/levelLayoutTest.png', 1024, 525);
	}

	function create() {
	  game.physics.startSystem(Phaser.Physics.ARCADE);

	  game.add.sprite(0, 0, _level1Js2['default'].background);

	  // Setup groups!
	  window.player = player = (0, _dragonJs.spawnDragon)(500, 500);
	  window.bullets = bullets = (0, _groupsJs.createGroup)();

	  window.waypoints = waypoints = (0, _levelLoaderJs.spawnWaypoints)(_level1Js2['default'].waypoints);
	  window.mobs = mobs = (0, _levelLoaderJs.spawnSprites)(_level1Js2['default'].mobs);
	  window.props = props = (0, _levelLoaderJs.spawnProps)(_level1Js2['default'].props);
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
	}

	function collideWaypoint(one, two) {
	  console.log('collideWaypoint', one, two);
	}

/***/ },
/* 1 */
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
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*global Phaser, game */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.spawnDragon = spawnDragon;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _fireJs = __webpack_require__(3);

	var _fireJs2 = _interopRequireDefault(_fireJs);

	var SPEED = 100;
	var SPRITE_CACHE = 'dragon';
	var FIRE_OFFSET_Y = -100;
	var FIRE_OFFSET_X = 25;
	var FIRE_SPEED = Phaser.Timer.HALF;

	function Dragon(game, x, y) {
	  this.game = game;
	  this.sprite = game.add.sprite(x, y, 'dragon');
	  game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	}
	Dragon.prototype = {
	  update: function update() {
	    var game = this.game;
	    var _Phaser$Keyboard = Phaser.Keyboard;
	    var LEFT = _Phaser$Keyboard.LEFT;
	    var RIGHT = _Phaser$Keyboard.RIGHT;
	    var SPACEBAR = _Phaser$Keyboard.SPACEBAR;

	    // Movement keys
	    if (game.input.keyboard.isDown(LEFT)) {
	      this.sprite.body.velocity.x = -SPEED;
	    } else if (game.input.keyboard.isDown(RIGHT)) {
	      this.sprite.body.velocity.x = SPEED;
	    } else {
	      this.sprite.body.velocity.x = 0;
	    }

	    // FIRE!!!
	    if (game.input.keyboard.isDown(SPACEBAR)) {
	      this.fire();
	    }
	  },

	  fire: function fire() {
	    if (this.bullet) {
	      return;
	    }
	    var _sprite = this.sprite;
	    var x = _sprite.x;
	    var y = _sprite.y;

	    this.bullet = new _fireJs2['default'](this.game, x + FIRE_OFFSET_X, y + FIRE_OFFSET_Y);

	    // Delay before they can fire again.
	    this.game.time.events.add(FIRE_SPEED, this.resetFire, this);
	  },

	  resetFire: function resetFire() {
	    this.bullet = null;
	  }
	};
	exports['default'] = Dragon;

	function spawnDragon(x, y) {
	  var sprite = game.add.sprite(x, y, 'dragon');
	  game.physics.enable(sprite, Phaser.Physics.ARCADE);

	  return sprite;
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	/*global Phaser, game, bullets */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.spawnFire = spawnFire;
	var SPEED = Phaser.Timer.HALF;
	var OFFSET_Y = -100;
	var OFFSET_X = 25;

	// totally not a constructor
	// constructors use NEW, we use SPAWN. Totally different! :)

	function spawnFire(x, y) {
	  var sprite = bullets.create(x + OFFSET_X, y + OFFSET_Y, 'fire');

	  sprite.body.velocity.y = -SPEED;
	  return sprite;
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*global Phaser, game*/
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.playerControl = playerControl;

	var _fireJs = __webpack_require__(3);

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
/* 5 */
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

	var _groupsJs = __webpack_require__(1);

	// create a group of waypoints that exist at [{x,y} ...]

	function spawnWaypoints(points) {
	  var group = (0, _groupsJs.createGroup)();

	  points.forEach(function (point) {
	    var sprite = group.create(point.x, point.y, 'waypoint');
	    sprite.anchor = { x: .5, y: 1 };
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
/* 6 */
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

					props: [{ x: 116, y: 160, spriteKey: 'wall' }, { x: 180, y: 160, spriteKey: 'wall' }, { x: 244, y: 160, spriteKey: 'wall' }, { x: 308, y: 160, spriteKey: 'wall' }, { x: 372, y: 160, spriteKey: 'wall' }, { x: 638, y: 160, spriteKey: 'tree' }, { x: 744, y: 160, spriteKey: 'tree' }, { x: 868, y: 160, spriteKey: 'tree' }, { x: 498, y: 250, spriteKey: 'tree' }, { x: 435, y: 378, spriteKey: 'tree' }, { x: 638, y: 378, spriteKey: 'tree' }, { x: 745, y: 378, spriteKey: 'shrub' }, { x: 806, y: 490, spriteKey: 'shrub' }, { x: 645, y: 490, spriteKey: 'tree' }, { x: 237, y: 490, spriteKey: 'shrub' }]
	};

	exports['default'] = Level;
	module.exports = exports['default'];

/***/ }
/******/ ]);