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

	var _startStateJs = __webpack_require__(12);

	var _startStateJs2 = _interopRequireDefault(_startStateJs);

	var _endStateJs = __webpack_require__(15);

	var _endStateJs2 = _interopRequireDefault(_endStateJs);

	var IPHONE6 = {
	  X: 667,
	  Y: 375
	};

	var game = new Phaser.Game(IPHONE6.X, IPHONE6.Y, Phaser.AUTO, 'content');
	window.game = game;

	game.state.add('start', _startStateJs2['default']);
	game.state.add('game', _gameStateJs2['default']);
	game.state.add('end', _endStateJs2['default']);

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

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _groupsJs = __webpack_require__(2);

	var _dragonJs = __webpack_require__(3);

	var _foregroundJs = __webpack_require__(5);

	var Props = _interopRequireWildcard(_foregroundJs);

	var _mobJs = __webpack_require__(6);

	var Mob = _interopRequireWildcard(_mobJs);

	var _controlsJs = __webpack_require__(7);

	var Controls = _interopRequireWildcard(_controlsJs);

	var _levelLoaderJs = __webpack_require__(9);

	var _fontsJs = __webpack_require__(11);

	window.Mob = Mob;

	var level = undefined;
	var levelFile = undefined;

	var player = undefined;
	var bullets = undefined;
	var balloons = undefined;
	var sfx = undefined;

	function init(lvlFile) {
	  window.levelFile = levelFile = lvlFile;
	}

	function preload() {
	  game.load.image('dragon', 'assets/dragon-77x91.png', 77, 91);
	  game.load.image('king', 'assets/king.png', 64, 64);
	  game.load.image('knight', 'assets/knight.png', 64, 64);
	  game.load.image('horse', 'assets/knightOnHorse.png', 64, 64);
	  //game.load.image('waypoint', 'assets/waypoint_20x20.png', 24, 24);
	  game.load.image('waypoint', 'assets/waypoint_10x10.png', 10, 10);
	  game.load.image('wall', 'assets/wall.png', 64, 64);
	  game.load.image('tower', 'assets/tower.png', 64, 64);

	  game.load.spritesheet('tree', 'assets/tree_spritesheet.png', 64, 64);
	  game.load.spritesheet('shrub', 'assets/shrub_spritesheet.png', 64, 64);
	  game.load.spritesheet('fire', 'assets/fire_4frame_20x40.png', 20, 40);

	  game.load.image('balloon', 'assets/balloon.png', 64, 64);

	  // backgrounds
	  game.load.image('background', 'assets/levelLayoutTest.png', 1024, 525);
	  game.load.image('bg-iphone', 'assets/bg-iphone.png', 667, 375);
	  game.load.image('curtains', 'assets/curtains.png', 667, 375);

	  game.load.audio('hit', 'assets/hit.wav');
	  game.load.audio('score', 'assets/shoot.wav');
	}

	function create() {
	  game.physics.startSystem(Phaser.Physics.ARCADE);

	  game.currentScore = 0;

	  window.level = level = (0, _levelLoaderJs.loadLevel)(levelFile);
	  // load level!
	  window.bullets = bullets = (0, _groupsJs.physicsGroup)();

	  // Score!
	  game.textScore = game.add.text(800, 10, 'SCORE: 0', _fontsJs.headerFont);

	  // How to Play
	  game.add.text(50, 540, 'ARROW KEYS: <- move ->', _fontsJs.infoFont);
	  game.add.text(50, 560, 'SPACEBAR: [Fire]', _fontsJs.infoFont);

	  // it's curtians for you!
	  window.curtains = game.add.image(0, 0, 'curtains');

	  // player on top of everything
	  window.player = player = (0, _dragonJs.spawnDragon)(100, 294);

	  Mob.startTimedGame(level.mobs);

	  // sounds
	  window.sfx = sfx = {
	    hit: game.add.audio('hit'),
	    score: game.add.audio('score')
	  };
	}

	function update() {
	  var _level = level;
	  var mobs = _level.mobs;
	  var fgGroup = _level.fgGroup;
	  var balloons = _level.balloons;
	  var ESC = Phaser.Keyboard.ESC;

	  Controls.update(game, player);
	  Mob.update(mobs);

	  game.physics.arcade.overlap(bullets, mobs.group, collideBulletMob);
	  //game.physics.arcade.collide(bullets, mobs.group, collideBulletMob);
	  game.physics.arcade.collide(bullets, fgGroup, collideBulletProp);
	  game.physics.arcade.collide(mobs.group, balloons, collideBalloon);

	  // debug
	  if (game.input.keyboard.isDown(ESC)) {
	    sfx.hit.play();
	  }
	}

	function updateScore(points) {
	  game.currentScore += points;
	  game.textScore.setText('SCORE: ' + game.currentScore);
	}

	// Props/foreground are indistructable
	function collideBulletProp(bullet, prop) {
	  // Bullets only collide once
	  if (!bullet.alive) {
	    return;
	  }

	  // kill the bullet
	  bullet.kill();
	  sfx.hit.play();

	  Props.onHit(prop);
	}

	function collideBulletMob(bullet, mob) {
	  // Bullets only collide once
	  if (!bullet.alive) {
	    return;
	  }

	  var _level2 = level;
	  var mobs = _level2.mobs;

	  var points = mob.data.points || 1;

	  bullet.kill();
	  mob.kill();
	  updateScore(points);
	  sfx.score.play();

	  // Game Over check
	  if (Mob.mobsLeft(mobs) === 0) {
	    level.state = 'win';
	    game.state.start('end');
	  }
	}

	function collideBalloon(mob, balloon) {
	  balloon.kill();
	  level.state = 'lost';
	  game.state.start('end');
	}

	exports['default'] = {
	  preload: preload,
	  create: create,
	  update: update,
	  init: init
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
	  // Move with tweens, not physics
	  sprite.body.moves = false;
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
	var OFFSET_X = 29;

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
/***/ function(module, exports) {

	/*global Phaser, game */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.spawn = spawn;
	exports.onHit = onHit;

	function spawn(group, data) {
	  var x = data.x;
	  var y = data.y;
	  var spriteKey = data.spriteKey;

	  var sprite = group.create(x, y, spriteKey);

	  sprite.anchor = { x: .5, y: 1 };
	  sprite.data = data;
	  sprite.body.immovable = true;

	  switch (spriteKey) {
	    case 'shrub':
	      sprite = toShrub(sprite);
	      break;
	    case 'tree':
	      sprite = toTree(sprite);
	      break;
	  }

	  return sprite;
	}

	function toShrub(sprite) {
	  sprite.health = 2;
	  // set the animations
	  sprite.animations.add('norm', [0]);
	  sprite.animations.add('burn', [1]);
	  sprite.animations.add('dead', [2]);
	  sprite.animations.play('norm', 24, true);

	  return sprite;
	}

	function toTree(sprite) {
	  sprite.health = 3;
	  // set the animations
	  sprite.animations.add('norm', [0]);
	  sprite.animations.add('burn', [1]);
	  sprite.animations.add('dead', [2]);
	  sprite.animations.play('norm', 24, true);

	  return sprite;
	}

	function onHit(sprite) {
	  var _sprite = sprite;
	  var key = _sprite.key;

	  switch (key) {
	    case 'shrub':
	      sprite = hitShrub(sprite);
	      break;
	    case 'tree':
	      sprite = hitTree(sprite);
	      break;
	  }

	  return sprite;
	}

	function hitShrub(sprite) {
	  var health = sprite.health - 1;

	  if (health === 1) {
	    sprite.animations.play('dead');
	  }

	  if (health === 0) {
	    sprite.kill();
	  }

	  sprite.health = health;
	  return sprite;
	}

	function hitTree(sprite) {
	  var health = sprite.health - 1;

	  if (health === 2) {
	    sprite.animations.play('burn');
	  }

	  if (health === 1) {
	    sprite.animations.play('dead');
	  }

	  if (health === 0) {
	    sprite.kill();
	  }

	  sprite.health = health;
	  return sprite;
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
	exports.mobsLeft = mobsLeft;
	var DELAY = Phaser.Timer.SECOND;
	var SPEED = 100; //Phaser.Timer.MINUTE * 4;
	var HIT_RANGE = 5;

	// Spawn a new sprite in the group.

	function spawn(group, data) {
	  var spriteKey = data.spriteKey;
	  var _data$tract$0 = data.tract[0];
	  var x = _data$tract$0.x;
	  var y = _data$tract$0.y;

	  var sprite = group.create(x, y, spriteKey);

	  sprite.alive = false;
	  sprite.visible = false;
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
	    mob.visible = true;
	    mob.tractIndex = -1;

	    moveToNextWaypoint(mob);

	    // work our why thought the list.
	    index += 1;
	  });
	}

	// Start the mob moving to the next waypoint
	function moveToNextWaypoint(sprite) {
	  var tract = sprite.data.tract;
	  var speed = sprite.data.speed || SPEED;
	  var nextIndex = sprite.tractIndex + 1;

	  if (nextIndex === tract.length) {
	    // loop back.
	    nextIndex = 0;
	  }

	  var _tract$nextIndex = tract[nextIndex];
	  var x = _tract$nextIndex.x;
	  var y = _tract$nextIndex.y;

	  sprite.tractIndex = nextIndex;
	  game.physics.arcade.moveToXY(sprite, x, y, speed);
	}

	// collision checks
	// @param {group} mobData

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

	function mobsLeft(mobData) {
	  var group = mobData.group;

	  return group.countLiving();
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*global Phaser */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.update = update;

	var _fireJs = __webpack_require__(4);

	var _utilJs = __webpack_require__(8);

	var THROTTLE = 200;
	var MOVE_DELAY = 300;
	var atMoveSpeed = (0, _utilJs.debounce)(MOVE_DELAY);
	var hasDelayEnded = delay(THROTTLE);

	function update(game, sprite) {
	  var pointer = game.input.activePointer;
	  var playerTween = undefined;

	  if (pointer.isDown) {
	    // We need to limit the speed since this function is called on update
	    atMoveSpeed(game.time.events, function () {
	      playerTween = game.add.tween(sprite);

	      // Fire when the tween completes
	      playerTween.onComplete.add(function () {
	        var x = sprite.x;
	        var y = sprite.y;

	        (0, _fireJs.spawnFire)(x, y);
	      });

	      // move to the pointer
	      playerTween.to(toPointer(sprite, pointer), MOVE_DELAY).start();
	    });
	  }
	}

	// Returns an object to use with tween.to
	function toPointer(sprite, pointer) {
	  var width = sprite.width;
	  var x = pointer.x;

	  // Adjust for sprite size
	  x -= width / 2;

	  return {
	    x: x
	  };
	}

	function delay(speed) {
	  var nextUpdate = 0;

	  return function (now) {
	    if (now > nextUpdate) {
	      nextUpdate = now + speed;
	      return true;
	    }

	    return false;
	  };
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	// Calls function only after delay time has passed.
	// poor man's debounce, using phaser's event timer
	// Returns a function that can only be called after the deplay.
	// If func can not be called, returns false.
	// If func can be called, returns result of func
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.debounce = debounce;

	function debounce(delay) {
	  var isReady = true;

	  return function (eventTimer, func) {
	    // ignore calls until ready
	    if (!isReady) {
	      return false;
	    }
	    // We are going to call func, so we are not ready.
	    isReady = false;

	    // Start the delay
	    eventTimer.add(delay, function () {
	      isReady = true;
	    });

	    // call the function
	    return func();
	  };
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*global Phaser, game, bullets */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.loadLevel = loadLevel;

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _mobJs = __webpack_require__(6);

	var Mob = _interopRequireWildcard(_mobJs);

	var _foregroundJs = __webpack_require__(5);

	var Foreground = _interopRequireWildcard(_foregroundJs);

	var _balloonJs = __webpack_require__(10);

	var Balloon = _interopRequireWildcard(_balloonJs);

	// Groups with physics.

	var _groupsJs = __webpack_require__(2);

	// Load the level from a lvl object.

	function loadLevel(lvl) {
	  // These are in order by z-index
	  var background = game.add.image(0, 0, lvl.background);
	  var mobList = loadMobList(lvl.mobs, lvl.waypoints);
	  var mobGroup = spawnMobGroup(mobList);
	  var fgGroup = spawnForegroundGroup(lvl.foreground);
	  var balloonGroup = spawnBalloonGroup(lvl.balloons);
	  //const waypointGroup = spawnWaypointsGroup(lvl.waypoints);

	  return {
	    background: background,
	    state: 'pregame',
	    score: 0,
	    mobs: {
	      list: mobList,
	      group: mobGroup
	    },
	    fgGroup: fgGroup,
	    balloons: balloonGroup
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

	function spawnBalloonGroup(balloonList) {
	  var group = (0, _groupsJs.physicsGroup)();

	  balloonList.forEach(function (data) {
	    var sprite = Balloon.spawn(group, data);
	  });

	  return group;
	}

	function spawnWaypointsGroup(waypoints) {
	  var group = game.add.group();

	  Object.keys(waypoints).forEach(function (tractName) {
	    waypoints[tractName].forEach(function (point) {
	      group.create(point.x, point.y, 'waypoint');
	    });
	  });

	  return group;
	}

/***/ },
/* 10 */
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
/* 11 */
/***/ function(module, exports) {

	/*global Phaser, game */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var headerFont = {
	  font: '12pt Georgia',
	  fill: '#fff'
	};

	exports.headerFont = headerFont;
	var infoFont = {
	  font: '12pt Tahoma',
	  fill: '#fff'
	};

	exports.infoFont = infoFont;
	var sceneFont = {
	  font: '12pt "Lucida Console", Monaco, monospace',
	  fill: '#ccc'
	};
	exports.sceneFont = sceneFont;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/*global Phaser, game */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _fontsJs = __webpack_require__(11);

	var _levelsLevel1Js = __webpack_require__(13);

	var _levelsLevel1Js2 = _interopRequireDefault(_levelsLevel1Js);

	var _levelsIphoneJs = __webpack_require__(14);

	var _levelsIphoneJs2 = _interopRequireDefault(_levelsIphoneJs);

	//
	// Lifecycle
	//
	function preload() {
	  game.load.image('carnie', 'assets/carnieDragon-105x158.png', 105, 158);
	  game.load.image('stuffedPrincess', 'assets/stuffedPrincess-89x101.png', 89, 101);
	}

	function create() {
	  // place somet nice things
	  game.add.image(550, 100, 'stuffedPrincess');
	  game.add.image(450, 100, 'stuffedPrincess');
	  game.add.image(350, 100, 'stuffedPrincess');
	  game.add.image(100, 217, 'carnie');

	  // instructions
	  game.add.text(10, 10, 'Dragon Carnival:', _fontsJs.sceneFont);
	  game.add.text(40, 45, 'Shoot the knights to win the stuffed princess doll.', _fontsJs.headerFont);
	  game.add.text(40, 65, 'If a human reaches your balloon, game over.', _fontsJs.headerFont);

	  game.add.text(400, 257, 'Tap to start!', _fontsJs.sceneFont);
	}

	function update() {
	  var SPACEBAR = Phaser.Keyboard.SPACEBAR;

	  // Press Space to Start
	  if (game.input.keyboard.isDown(SPACEBAR)) {
	    game.state.start('game', true, false, _levelsLevel1Js2['default']);
	  }

	  // Tap to Start
	  if (game.input.activePointer.isDown) {
	    game.state.start('game', true, false, _levelsIphoneJs2['default']);
	  }
	}
	exports['default'] = {
	  preload: preload,
	  create: create,
	  update: update
	};
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports) {

	/*global Phaser */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var Level = {
	  waypoints: {
	    mainPath: [{ x: 120, y: 0 }, { x: 120, y: 138 }, { x: 904, y: 138 }, { x: 904, y: 229 }, { x: 120, y: 229 }, { x: 120, y: 354 }, { x: 904, y: 354 }, { x: 904, y: 470 }, { x: 120, y: 470 }, { x: 120, y: 523 }],
	    guardPath: [{ x: 1024, y: 290 }, { x: 200, y: 290 }],
	    horsePath: [{ x: 1024, y: 290 }, { x: 200, y: 290 }, { x: 120, y: 290 }, { x: 120, y: 354 }, { x: 904, y: 354 }, { x: 904, y: 470 }, { x: 120, y: 470 }, { x: 120, y: 523 }]
	  },

	  background: 'background',
	  mobs: [
	  // the order listed is the order they appear
	  { spriteKey: 'knight', tract: 'guardPath' }, { spriteKey: 'knight', tract: 'guardPath' }, { spriteKey: 'knight', tract: 'guardPath' }, { spriteKey: 'horse', tract: 'horsePath', speed: 250 }, { spriteKey: 'knight', tract: 'mainPath' }, { spriteKey: 'knight', tract: 'mainPath' }, { spriteKey: 'horse', tract: 'mainPath', speed: 260, points: 2 }, { spriteKey: 'knight', tract: 'mainPath' }, { spriteKey: 'king', tract: 'mainPath', speed: 90, points: 3 }, { spriteKey: 'knight', tract: 'guardPath', speed: 150 }, { spriteKey: 'knight', tract: 'guardPath', speed: 150 }, { spriteKey: 'horse', tract: 'horsePath', speed: 250 }, { spriteKey: 'knight', tract: 'mainPath' }, { spriteKey: 'knight', tract: 'mainPath' }, { spriteKey: 'horse', tract: 'mainPath', speed: 200, points: 2 }, { spriteKey: 'horse', tract: 'mainPath', speed: 250, points: 2 }, { spriteKey: 'knight', tract: 'mainPath' }, { spriteKey: 'horse', tract: 'mainPath', speed: 260, points: 2 }, { spriteKey: 'knight', tract: 'mainPath' }, { spriteKey: 'knight', tract: 'guardPath' }, { spriteKey: 'knight', tract: 'guardPath', speed: 150 }, { spriteKey: 'knight', tract: 'guardPath', speed: 150 }, { spriteKey: 'horse', tract: 'horsePath', speed: 250 }, { spriteKey: 'knight', tract: 'mainPath', speed: 150 }, { spriteKey: 'knight', tract: 'mainPath', speed: 150 }, { spriteKey: 'knight', tract: 'mainPath', speed: 150 }, { spriteKey: 'knight', tract: 'horsePath' }, { spriteKey: 'horse', tract: 'horsePath', speed: 250, points: 2 }, { spriteKey: 'knight', tract: 'horsePath' }, { spriteKey: 'knight', tract: 'horsePath' }, { spriteKey: 'horse', tract: 'horsePath', speed: 250, points: 2 }, { spriteKey: 'knight', tract: 'mainPath', speed: 150 }, { spriteKey: 'knight', tract: 'mainPath' }, { spriteKey: 'knight', tract: 'mainPath', speed: 150 }, { spriteKey: 'knight', tract: 'mainPath', speed: 150 }, { spriteKey: 'horse', tract: 'mainPath', speed: 250, points: 2 }, { spriteKey: 'king', tract: 'mainPath', speed: 120, points: 3 }],

	  foreground: [
	  // mainPath y: 138
	  { x: 120, y: 160, spriteKey: 'wall' }, { x: 304, y: 160, spriteKey: 'wall' }, { x: 370, y: 160, spriteKey: 'wall' }

	  // mainPath y: 229
	  , { x: 438, y: 240, spriteKey: 'tree' }, { x: 904, y: 240, spriteKey: 'wall' }

	  // mainPath y: 354
	  , { x: 438, y: 376, spriteKey: 'tree' }, { x: 538, y: 376, spriteKey: 'tree' }, { x: 120, y: 376, spriteKey: 'wall' }, { x: 155, y: 300, spriteKey: 'tower' }

	  // mainPath y: 470
	  , { x: 904, y: 490, spriteKey: 'tower' }, { x: 804, y: 490, spriteKey: 'shrub' }, { x: 654, y: 490, spriteKey: 'shrub' }, { x: 300, y: 490, spriteKey: 'shrub' }],
	  balloons: [{ x: 120, y: 520, spriteKey: 'balloon' }]
	};

	exports['default'] = Level;
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var level = {
	  //background: 'bg-iphone'
	  background: 'bg-iphone',
	  waypoints: {
	    mainPath: [{ x: 0, y: 50 }, { x: 273, y: 55 }, { x: 0, y: 142 }, { x: 185, y: 164 }, { x: 61, y: 230 }, { x: 275, y: 275 }, { x: 60, y: 383 }],
	    altPath: [{ x: 604, y: 0 }, { x: 577, y: 56 }, { x: 357, y: 57 }, { x: 306, y: 101 }, { x: 284, y: 145 }, { x: 285, y: 193 }, { x: 305, y: 229 }, { x: 346, y: 264 }, { x: 582, y: 256 }, { x: 621, y: 342 }]
	  },
	  mobs: [{ spriteKey: 'knight', tract: 'mainPath' }, { spriteKey: 'knight', tract: 'altPath' }],
	  foreground: [{ x: 438, y: 240, spriteKey: 'tree' }],
	  balloons: [{ x: 500, y: 342, spriteKey: 'balloon' }]
	};
	exports['default'] = level;
	module.exports = exports['default'];

/***/ },
/* 15 */
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
	  game.load.image('carnie', 'assets/carnieDragon.png', 210, 317);
	  game.load.image('stuffedPrincess', 'assets/stuffedPrincess.png', 178, 203);
	}

	function create() {
	  addGameOver();
	  //game.add.text(100, 100, 'You are Monster END!', headerFont);
	  //game.add.text(100, 150, 'Press [ENTER] NOW!!!', headerFont);
	  game.add.text(100, 200, 'Your score: ' + game.currentScore, _fontsJs.headerFont);

	  game.add.text(100, 150, 'Refresh page to play again', _fontsJs.headerFont);
	}

	function update() {
	  var ENTER = Phaser.Keyboard.ENTER;

	  if (game.input.keyboard.isDown(ENTER)) {
	    game.state.start('game', true);
	  }
	}

	function addGameOver() {
	  var score = game.currentScore;
	  var didWin = level.state === 'win';

	  if (didWin) {
	    game.add.text(100, 100, 'You WIN!', _fontsJs.headerFont);
	    game.add.image(500, 100, 'stuffedPrincess');
	  } else {
	    game.add.text(100, 100, 'You LOST!', _fontsJs.headerFont);
	    game.add.image(100, 300, 'carnie');
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