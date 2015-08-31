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

	__webpack_require__(1);

	var _statesGameJs = __webpack_require__(2);

	var _statesGameJs2 = _interopRequireDefault(_statesGameJs);

	var _statesStartJs = __webpack_require__(13);

	var _statesStartJs2 = _interopRequireDefault(_statesStartJs);

	var _statesEndJs = __webpack_require__(15);

	var _statesEndJs2 = _interopRequireDefault(_statesEndJs);

	var _statesEditorJs = __webpack_require__(16);

	var _statesEditorJs2 = _interopRequireDefault(_statesEditorJs);

	var game = new Phaser.Game(1136, 640, Phaser.AUTO, 'content');
	window.game = game;

	game.state.add('start', _statesStartJs2['default']);
	game.state.add('game', _statesGameJs2['default']);
	game.state.add('end', _statesEndJs2['default']);
	game.state.add('editor', _statesEditorJs2['default']);

	// prod
	game.state.start('start');
	// dev
	//game.state.start('game');
	//game.state.start('editor');

/***/ },
/* 1 */
/***/ function(module, exports) {

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
	'use strict';

	if (!Object.assign) {
	  Object.defineProperty(Object, 'assign', {
	    enumerable: false,
	    configurable: true,
	    writable: true,
	    value: function value(target) {
	      'use strict';
	      if (target === undefined || target === null) {
	        throw new TypeError('Cannot convert first argument to object');
	      }

	      var to = Object(target);
	      for (var i = 1; i < arguments.length; i++) {
	        var nextSource = arguments[i];
	        if (nextSource === undefined || nextSource === null) {
	          continue;
	        }
	        nextSource = Object(nextSource);

	        var keysArray = Object.keys(Object(nextSource));
	        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
	          var nextKey = keysArray[nextIndex];
	          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
	          if (desc !== undefined && desc.enumerable) {
	            to[nextKey] = nextSource[nextKey];
	          }
	        }
	      }
	      return to;
	    }
	  });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*global Phaser, game */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _preloadJs = __webpack_require__(3);

	var _groupsJs = __webpack_require__(5);

	var _dragonJs = __webpack_require__(6);

	var _playerJs = __webpack_require__(8);

	var _foregroundJs = __webpack_require__(4);

	var Props = _interopRequireWildcard(_foregroundJs);

	var _mobJs = __webpack_require__(9);

	var Mob = _interopRequireWildcard(_mobJs);

	var _levelLoaderJs = __webpack_require__(10);

	var _fontsJs = __webpack_require__(12);

	var level = undefined;
	var player = undefined;
	var balloons = undefined;
	var sfx = undefined;

	function create() {
	  var levelData = window.levelFile;
	  game.physics.startSystem(Phaser.Physics.ARCADE);

	  game.currentScore = 0;

	  // load level!
	  window.level = level = (0, _levelLoaderJs.loadLevel)(levelData);

	  // player on top of everything
	  window.player = player = (0, _dragonJs.spawnDragon)(500, 500);

	  // UI
	  // Score!
	  game.textScore = game.add.text(800, 10, 'SCORE: 0', _fontsJs.headerFont);
	  // How to Play
	  game.add.text(50, 540, 'ARROW KEYS: <- move ->', _fontsJs.infoFont);
	  game.add.text(50, 560, 'SPACEBAR: [Fire]', _fontsJs.infoFont);

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
	  var bullets = _level.bullets;
	  var ESC = Phaser.Keyboard.ESC;

	  (0, _playerJs.playerControl)(player);
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
	  create: create,
	  update: update,
	  preload: _preloadJs.preload
	};
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*global Phaser, game */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.preload = preload;

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _foregroundJs = __webpack_require__(4);

	var FG = _interopRequireWildcard(_foregroundJs);

	function preload() {
	  // Player
	  game.load.image('dragon', 'assets/dragon2.png', 128, 128);
	  game.load.spritesheet('fire', 'assets/fire_4frame_20x40.png', 20, 40);
	  game.load.image('balloon', 'assets/balloon.png', 64, 64);

	  // Mobs 
	  game.load.image('king', 'assets/king.png', 64, 64);
	  game.load.image('knight', 'assets/knight.png', 64, 64);
	  game.load.image('horse', 'assets/knightOnHorse.png', 64, 64);

	  // Props
	  game.load.image(FG.TYPES.WALL, 'assets/wall.png', 64, 64);
	  game.load.image(FG.TYPES.TOWER, 'assets/tower.png', 64, 64);
	  game.load.spritesheet(FG.TYPES.TREE, 'assets/tree_spritesheet.png', 64, 64);
	  game.load.spritesheet(FG.TYPES.SHRUB, 'assets/shrub_spritesheet.png', 64, 64);

	  // Misc
	  game.load.image('carnie', 'assets/carnieDragon.png', 210, 317);
	  game.load.image('stuffedPrincess', 'assets/stuffedPrincess.png', 178, 203);
	  game.load.image('background', 'assets/levelLayoutTest.png', 1024, 525);

	  // Sound
	  game.load.audio('hit', 'assets/hit.wav');
	  game.load.audio('score', 'assets/shoot.wav');
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	/*global Phaser, game */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.spawn = spawn;
	exports.onHit = onHit;
	var TYPES = {
	  WALL: 'FG_TYPES_WALL',
	  TOWER: 'FG_TYPES_TOWER',
	  TREE: 'FG_TYPES_TREE',
	  SHRUB: 'FG_TYPES_SHRUB'
	};

	exports.TYPES = TYPES;

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
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*global Phaser, game */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.spawnDragon = spawnDragon;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _fireJs = __webpack_require__(7);

	var _fireJs2 = _interopRequireDefault(_fireJs);

	function spawnDragon(x, y) {
	  var sprite = game.add.sprite(x, y, 'dragon');
	  game.physics.enable(sprite, Phaser.Physics.ARCADE);

	  sprite.health = 3;
	  return sprite;
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	/*global Phaser, game, level */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.spawnFire = spawnFire;
	var SPEED = 300;
	var OFFSET_Y = 0;
	var OFFSET_X = 63;

	// totally not a constructor
	// constructors use NEW, we use SPAWN. Totally different! :)

	function spawnFire(x, y) {
	  var sprite = level.bullets.create(x + OFFSET_X, y + OFFSET_Y, 'fire');

	  sprite.animations.add('fly');
	  sprite.animations.play('fly', 24, true);
	  sprite.body.velocity.y = -SPEED;
	  return sprite;
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*global Phaser, game*/
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.playerControl = playerControl;

	var _fireJs = __webpack_require__(7);

	var FIRE_SPEED = Phaser.Timer.HALF * 1.7; // Phaser.Timer.SECOND;
	var SPEED = 150;

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
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*global Phaser, game, bullets */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.loadLevel = loadLevel;
	exports.exportLevel = exportLevel;

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _mobJs = __webpack_require__(9);

	var Mob = _interopRequireWildcard(_mobJs);

	var _foregroundJs = __webpack_require__(4);

	var Foreground = _interopRequireWildcard(_foregroundJs);

	var _balloonJs = __webpack_require__(11);

	var Balloon = _interopRequireWildcard(_balloonJs);

	// Groups with physics.

	var _groupsJs = __webpack_require__(5);

	/**
	 * Loads a level data file.
	 * Returns a level gamestate object.
	 */

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
	    balloons: balloonGroup,
	    bullets: (0, _groupsJs.physicsGroup)()
	  };
	}

	function exportLevel(lvlData) {
	  var fgGroup = lvlData.fgGroup;
	  var foreground = [];

	  fgGroup.forEachAlive(function (sprite) {
	    foreground.push({
	      x: sprite.x,
	      y: sprite.y,
	      spriteKey: sprite.data.spriteKey
	    });
	  });

	  return {
	    foreground: foreground
	  };
	}

	// Join the mob with the tract data.
	// this way every mob knows their entire tract
	function loadMobList(lvlMobs, lvlWaypoints) {
	  return lvlMobs.map(function (lvlMob) {
	    var tractName = lvlMob.tract;

	    return Object.assign({}, lvlMob, {
	      spriteKey: lvlMob.spriteKey,
	      tractName: tractName,
	      tract: lvlWaypoints[tractName]
	    });
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
/* 11 */
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
/* 12 */
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
	var infoFont = {
	  fill: '#fff',
	  font: '12pt Tahoma'
	};
	exports.infoFont = infoFont;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/*global Phaser, game */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _preloadJs = __webpack_require__(3);

	var _fontsJs = __webpack_require__(12);

	var _levelsLevel1Js = __webpack_require__(14);

	var _levelsLevel1Js2 = _interopRequireDefault(_levelsLevel1Js);

	//
	// Lifecycle
	//
	function create() {
	  // place somet nice things
	  game.add.image(800, 100, 'stuffedPrincess');
	  game.add.image(100, 300, 'carnie');

	  // instructions
	  game.add.text(100, 100, 'You are dragon.', _fontsJs.headerFont);
	  game.add.text(100, 200, 'Win dragon lady friend a stuffed princess.', _fontsJs.headerFont);
	  game.add.text(400, 500, 'Press Space to try your luck!', _fontsJs.headerFont);
	}

	function update() {
	  var _Phaser$Keyboard = Phaser.Keyboard;
	  var SPACEBAR = _Phaser$Keyboard.SPACEBAR;
	  var E = _Phaser$Keyboard.E;

	  // make it global so the other states can use it.
	  window.levelFile = _levelsLevel1Js2['default'];

	  if (game.input.keyboard.isDown(SPACEBAR)) {
	    game.state.start('game');
	  } else if (game.input.keyboard.isDown(E)) {
	    game.state.start('editor');
	  }
	}
	exports['default'] = {
	  create: create,
	  update: update,
	  preload: _preloadJs.preload
	};
	module.exports = exports['default'];

/***/ },
/* 14 */
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
	  { x: 120, y: 160, spriteKey: 'FG_TYPES_WALL' }, { x: 304, y: 160, spriteKey: 'FG_TYPES_WALL' }, { x: 370, y: 160, spriteKey: 'FG_TYPES_WALL' }

	  // mainPath y: 229
	  , { x: 438, y: 240, spriteKey: 'FG_TYPES_TREE' }, { x: 438, y: 240, spriteKey: 'FG_TYPES_TREE' }, { x: 904, y: 240, spriteKey: 'FG_TYPES_WALL' }

	  // mainPath y: 354
	  , { x: 438, y: 376, spriteKey: 'FG_TYPES_TREE' }, { x: 538, y: 376, spriteKey: 'FG_TYPES_TREE' }, { x: 120, y: 376, spriteKey: 'FG_TYPES_WALL' }, { x: 155, y: 300, spriteKey: 'FG_TYPES_TOWER' }

	  // mainPath y: 470
	  , { x: 904, y: 490, spriteKey: 'FG_TYPES_TOWER' }, { x: 804, y: 490, spriteKey: 'FG_TYPES_SHRUB' }, { x: 654, y: 490, spriteKey: 'FG_TYPES_SHRUB' }, { x: 300, y: 490, spriteKey: 'FG_TYPES_SHRUB' }],
	  balloons: [{ x: 120, y: 520, spriteKey: 'balloon' }]
	};

	exports['default'] = Level;
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/*global Phaser, game */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _preloadJs = __webpack_require__(3);

	var _fontsJs = __webpack_require__(12);

	var _gameJs = __webpack_require__(2);

	//
	// Lifecycle
	//
	function create() {
	  addGameOver();
	  //game.add.text(100, 100, 'You are Monster END!', headerFont);
	  //game.add.text(100, 150, 'Press [ENTER] NOW!!!', headerFont);
	  game.add.text(100, 200, 'Your score: ' + game.currentScore, _fontsJs.headerFont);

	  game.add.text(100, 150, 'Press [enter] to play again', _fontsJs.headerFont);
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
	  create: create,
	  update: update,
	  preload: _preloadJs.preload
	};
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/*global Phaser, game, $ */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _preloadJs = __webpack_require__(3);

	var _fontsJs = __webpack_require__(12);

	var _levelLoaderJs = __webpack_require__(10);

	var _editorJs = __webpack_require__(17);

	var _foregroundJs = __webpack_require__(4);

	var FG = _interopRequireWildcard(_foregroundJs);

	var _editorUiJs = __webpack_require__(18);

	var ui = _interopRequireWildcard(_editorUiJs);

	var _editorActionsJs = __webpack_require__(23);

	var level = undefined;
	var selectedSprite = null;

	function create() {
	  level = (0, _levelLoaderJs.loadLevel)(window.levelFile);

	  ui.createUI(level);
	}

	function update() {
	  var _Phaser$Keyboard = Phaser.Keyboard;
	  var A = _Phaser$Keyboard.A;
	  var ENTER = _Phaser$Keyboard.ENTER;

	  var sprite = undefined;

	  //if (game.input.keyboard.isDown(ENTER)) {
	  if (game.input.keyboard.isDown(ENTER)) {
	    console.log('you click long time!');
	  }

	  ui.update();
	}

	exports['default'] = {
	  create: create,
	  update: update,
	  preload: _preloadJs.preload
	};
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	// Editor functions
	// used by states/editor.js

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/*global Phaser, game, $ */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.createUI = createUI;
	exports.update = update;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _foregroundJs = __webpack_require__(4);

	var FG = _interopRequireWildcard(_foregroundJs);

	var _levelLoaderJs = __webpack_require__(10);

	// UI controls for the editor

	var _selectMustache = __webpack_require__(19);

	var _selectMustache2 = _interopRequireDefault(_selectMustache);

	var UI_SELECTOR = '#ui';
	var ADD_SPEED = Phaser.Timer.HALF;

	var selectedSprite = null;
	var boxGraphics = null;
	var level = null;

	// Create a new UI

	function createUI(levelData) {
	  var elmRoot = $(UI_SELECTOR);
	  var elmForeground = elmRoot.find();

	  level = levelData;
	  boxGraphics = game.add.graphics(0, 0);

	  createQuickbar();
	  createForeground(level);
	}

	//
	// Update the UI

	function update() {
	  if (selectedSprite) {
	    drawBox(boxGraphics, selectedSprite);
	  }
	}

	function createForeground(level) {
	  var selector = '.js-foreground';
	  var canAdd = true;
	  var sprite = undefined;

	  level.fgGroup.forEach(makeDragable, this, true, {
	    onInputDown: setSelected
	  });

	  renderSelect(selector, {
	    list: Object.keys(FG.TYPES).map(fromConstants(FG.TYPES)),
	    label: 'Foreground'
	  });

	  bindSelect(selector, function (type, target) {
	    if (!canAdd) {
	      return;
	    }
	    canAdd = false;

	    sprite = FG.spawn(level.fgGroup, { x: 100, y: 100, spriteKey: type });
	    sprite = makeDragable(sprite, { onInputDown: setSelected });
	    selectedSprite = sprite;

	    game.time.events.add(ADD_SPEED, function () {
	      canAdd = true;
	    });
	  });
	}

	function createQuickbar() {
	  var elmDelete = $(UI_SELECTOR).find('.js-selected-delete');
	  var elmDownload = $(UI_SELECTOR).find('.js-download');
	  var elmPlay = $(UI_SELECTOR).find('.js-play');

	  // Delete
	  elmDelete.bind('click', function (evt) {
	    selectedSprite.destroy();
	    selectedSprite = null;
	  });

	  // Export/Download
	  elmDownload.bind('click', function (evt) {
	    var lvlData = (0, _levelLoaderJs.exportLevel)(level);

	    console.log(JSON.stringify(lvlData, null, '  '));
	  });

	  // Play
	  elmPlay.bind('click', function (evt) {
	    var lvlData = (0, _levelLoaderJs.exportLevel)(level);

	    // Use Object.assign until we are building a full file.
	    window.levelFile = Object.assign({}, window.levelFile, lvlData);
	    game.state.start('game');
	  });
	}

	function fromConstants(constants) {
	  return function (key) {
	    return {
	      key: key,
	      value: constants[key]
	    };
	  };
	}

	function renderSelect(selector, data) {
	  var elm = $(selector);
	  var template = _selectMustache2['default'];

	  elm.html(template(data));
	  return elm;
	}

	function bindSelect(selector, handleChange) {
	  var elm = $(selector).find('a');

	  elm.bind('click', function (evt) {
	    var target = evt.target;
	    var value = target.dataset.value;

	    handleChange(value, target);
	  });
	}

	function setSelected(sprite) {
	  return window.selectedSprite = selectedSprite = sprite;
	}

	function drawBox(graphics, sprite) {
	  var x = sprite.x;
	  var y = sprite.y;
	  var height = sprite.height;
	  var width = sprite.width;
	  var anchor = sprite.anchor;

	  graphics.x = x - width * anchor.x;
	  graphics.y = y;
	  graphics.lineStyle(2, 0x0000FF, 1);
	  graphics.drawRect(0, 0, width, -height);

	  return graphics;
	}

	// Make the sprite clickable/dragable
	function makeDragable(sprite, events) {
	  sprite.inputEnabled = true;
	  sprite.input.enableDrag(true);

	  if (events.onInputDown) {
	    sprite.events.onInputDown.add(events.onInputDown);
	  }

	  if (events.onInputUp) {
	    sprite.events.onInputUp.add(events.onInputUp);
	  }

	  return sprite;
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var H = __webpack_require__(20);
	module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("\n" + i);t.b("<!-- Single button -->");t.b("\n" + i);t.b("<div class=\"btn-group\">");t.b("\n" + i);t.b("  <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">");t.b("\n" + i);t.b("    ");t.b(t.v(t.f("label",c,p,0)));t.b(" <span class=\"caret\"></span>");t.b("\n" + i);t.b("  </button>");t.b("\n" + i);t.b("  <ul class=\"dropdown-menu\">");t.b("\n" + i);if(t.s(t.f("list",c,p,1),c,p,0,275,375,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <li>");t.b("\n" + i);t.b("          <a data-value=\"");t.b(t.v(t.f("value",c,p,0)));t.b("\">");t.b("\n" + i);t.b("            ");t.b(t.v(t.f("key",c,p,0)));t.b("\n" + i);t.b("          </a>");t.b("\n" + i);t.b("      </li>");t.b("\n" + i);});c.pop();}t.b("  </ul>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "\n<!-- Single button -->\n<div class=\"btn-group\">\n  <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n    {{label}} <span class=\"caret\"></span>\n  </button>\n  <ul class=\"dropdown-menu\">\n    {{#list}}\n      <li>\n          <a data-value=\"{{value}}\">\n            {{key}}\n          </a>\n      </li>\n    {{/list}}\n  </ul>\n</div>\n", H);return T.render.apply(T, arguments); };

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright 2011 Twitter, Inc.
	 *  Licensed under the Apache License, Version 2.0 (the "License");
	 *  you may not use this file except in compliance with the License.
	 *  You may obtain a copy of the License at
	 *
	 *  http://www.apache.org/licenses/LICENSE-2.0
	 *
	 *  Unless required by applicable law or agreed to in writing, software
	 *  distributed under the License is distributed on an "AS IS" BASIS,
	 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 *  See the License for the specific language governing permissions and
	 *  limitations under the License.
	 */

	// This file is for use with Node.js. See dist/ for browser files.

	var Hogan = __webpack_require__(21);
	Hogan.Template = __webpack_require__(22).Template;
	Hogan.template = Hogan.Template;
	module.exports = Hogan;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright 2011 Twitter, Inc.
	 *  Licensed under the Apache License, Version 2.0 (the "License");
	 *  you may not use this file except in compliance with the License.
	 *  You may obtain a copy of the License at
	 *
	 *  http://www.apache.org/licenses/LICENSE-2.0
	 *
	 *  Unless required by applicable law or agreed to in writing, software
	 *  distributed under the License is distributed on an "AS IS" BASIS,
	 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 *  See the License for the specific language governing permissions and
	 *  limitations under the License.
	 */

	(function (Hogan) {
	  // Setup regex  assignments
	  // remove whitespace according to Mustache spec
	  var rIsWhitespace = /\S/,
	      rQuot = /\"/g,
	      rNewline =  /\n/g,
	      rCr = /\r/g,
	      rSlash = /\\/g,
	      rLineSep = /\u2028/,
	      rParagraphSep = /\u2029/;

	  Hogan.tags = {
	    '#': 1, '^': 2, '<': 3, '$': 4,
	    '/': 5, '!': 6, '>': 7, '=': 8, '_v': 9,
	    '{': 10, '&': 11, '_t': 12
	  };

	  Hogan.scan = function scan(text, delimiters) {
	    var len = text.length,
	        IN_TEXT = 0,
	        IN_TAG_TYPE = 1,
	        IN_TAG = 2,
	        state = IN_TEXT,
	        tagType = null,
	        tag = null,
	        buf = '',
	        tokens = [],
	        seenTag = false,
	        i = 0,
	        lineStart = 0,
	        otag = '{{',
	        ctag = '}}';

	    function addBuf() {
	      if (buf.length > 0) {
	        tokens.push({tag: '_t', text: new String(buf)});
	        buf = '';
	      }
	    }

	    function lineIsWhitespace() {
	      var isAllWhitespace = true;
	      for (var j = lineStart; j < tokens.length; j++) {
	        isAllWhitespace =
	          (Hogan.tags[tokens[j].tag] < Hogan.tags['_v']) ||
	          (tokens[j].tag == '_t' && tokens[j].text.match(rIsWhitespace) === null);
	        if (!isAllWhitespace) {
	          return false;
	        }
	      }

	      return isAllWhitespace;
	    }

	    function filterLine(haveSeenTag, noNewLine) {
	      addBuf();

	      if (haveSeenTag && lineIsWhitespace()) {
	        for (var j = lineStart, next; j < tokens.length; j++) {
	          if (tokens[j].text) {
	            if ((next = tokens[j+1]) && next.tag == '>') {
	              // set indent to token value
	              next.indent = tokens[j].text.toString()
	            }
	            tokens.splice(j, 1);
	          }
	        }
	      } else if (!noNewLine) {
	        tokens.push({tag:'\n'});
	      }

	      seenTag = false;
	      lineStart = tokens.length;
	    }

	    function changeDelimiters(text, index) {
	      var close = '=' + ctag,
	          closeIndex = text.indexOf(close, index),
	          delimiters = trim(
	            text.substring(text.indexOf('=', index) + 1, closeIndex)
	          ).split(' ');

	      otag = delimiters[0];
	      ctag = delimiters[delimiters.length - 1];

	      return closeIndex + close.length - 1;
	    }

	    if (delimiters) {
	      delimiters = delimiters.split(' ');
	      otag = delimiters[0];
	      ctag = delimiters[1];
	    }

	    for (i = 0; i < len; i++) {
	      if (state == IN_TEXT) {
	        if (tagChange(otag, text, i)) {
	          --i;
	          addBuf();
	          state = IN_TAG_TYPE;
	        } else {
	          if (text.charAt(i) == '\n') {
	            filterLine(seenTag);
	          } else {
	            buf += text.charAt(i);
	          }
	        }
	      } else if (state == IN_TAG_TYPE) {
	        i += otag.length - 1;
	        tag = Hogan.tags[text.charAt(i + 1)];
	        tagType = tag ? text.charAt(i + 1) : '_v';
	        if (tagType == '=') {
	          i = changeDelimiters(text, i);
	          state = IN_TEXT;
	        } else {
	          if (tag) {
	            i++;
	          }
	          state = IN_TAG;
	        }
	        seenTag = i;
	      } else {
	        if (tagChange(ctag, text, i)) {
	          tokens.push({tag: tagType, n: trim(buf), otag: otag, ctag: ctag,
	                       i: (tagType == '/') ? seenTag - otag.length : i + ctag.length});
	          buf = '';
	          i += ctag.length - 1;
	          state = IN_TEXT;
	          if (tagType == '{') {
	            if (ctag == '}}') {
	              i++;
	            } else {
	              cleanTripleStache(tokens[tokens.length - 1]);
	            }
	          }
	        } else {
	          buf += text.charAt(i);
	        }
	      }
	    }

	    filterLine(seenTag, true);

	    return tokens;
	  }

	  function cleanTripleStache(token) {
	    if (token.n.substr(token.n.length - 1) === '}') {
	      token.n = token.n.substring(0, token.n.length - 1);
	    }
	  }

	  function trim(s) {
	    if (s.trim) {
	      return s.trim();
	    }

	    return s.replace(/^\s*|\s*$/g, '');
	  }

	  function tagChange(tag, text, index) {
	    if (text.charAt(index) != tag.charAt(0)) {
	      return false;
	    }

	    for (var i = 1, l = tag.length; i < l; i++) {
	      if (text.charAt(index + i) != tag.charAt(i)) {
	        return false;
	      }
	    }

	    return true;
	  }

	  // the tags allowed inside super templates
	  var allowedInSuper = {'_t': true, '\n': true, '$': true, '/': true};

	  function buildTree(tokens, kind, stack, customTags) {
	    var instructions = [],
	        opener = null,
	        tail = null,
	        token = null;

	    tail = stack[stack.length - 1];

	    while (tokens.length > 0) {
	      token = tokens.shift();

	      if (tail && tail.tag == '<' && !(token.tag in allowedInSuper)) {
	        throw new Error('Illegal content in < super tag.');
	      }

	      if (Hogan.tags[token.tag] <= Hogan.tags['$'] || isOpener(token, customTags)) {
	        stack.push(token);
	        token.nodes = buildTree(tokens, token.tag, stack, customTags);
	      } else if (token.tag == '/') {
	        if (stack.length === 0) {
	          throw new Error('Closing tag without opener: /' + token.n);
	        }
	        opener = stack.pop();
	        if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {
	          throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);
	        }
	        opener.end = token.i;
	        return instructions;
	      } else if (token.tag == '\n') {
	        token.last = (tokens.length == 0) || (tokens[0].tag == '\n');
	      }

	      instructions.push(token);
	    }

	    if (stack.length > 0) {
	      throw new Error('missing closing tag: ' + stack.pop().n);
	    }

	    return instructions;
	  }

	  function isOpener(token, tags) {
	    for (var i = 0, l = tags.length; i < l; i++) {
	      if (tags[i].o == token.n) {
	        token.tag = '#';
	        return true;
	      }
	    }
	  }

	  function isCloser(close, open, tags) {
	    for (var i = 0, l = tags.length; i < l; i++) {
	      if (tags[i].c == close && tags[i].o == open) {
	        return true;
	      }
	    }
	  }

	  function stringifySubstitutions(obj) {
	    var items = [];
	    for (var key in obj) {
	      items.push('"' + esc(key) + '": function(c,p,t,i) {' + obj[key] + '}');
	    }
	    return "{ " + items.join(",") + " }";
	  }

	  function stringifyPartials(codeObj) {
	    var partials = [];
	    for (var key in codeObj.partials) {
	      partials.push('"' + esc(key) + '":{name:"' + esc(codeObj.partials[key].name) + '", ' + stringifyPartials(codeObj.partials[key]) + "}");
	    }
	    return "partials: {" + partials.join(",") + "}, subs: " + stringifySubstitutions(codeObj.subs);
	  }

	  Hogan.stringify = function(codeObj, text, options) {
	    return "{code: function (c,p,i) { " + Hogan.wrapMain(codeObj.code) + " }," + stringifyPartials(codeObj) +  "}";
	  }

	  var serialNo = 0;
	  Hogan.generate = function(tree, text, options) {
	    serialNo = 0;
	    var context = { code: '', subs: {}, partials: {} };
	    Hogan.walk(tree, context);

	    if (options.asString) {
	      return this.stringify(context, text, options);
	    }

	    return this.makeTemplate(context, text, options);
	  }

	  Hogan.wrapMain = function(code) {
	    return 'var t=this;t.b(i=i||"");' + code + 'return t.fl();';
	  }

	  Hogan.template = Hogan.Template;

	  Hogan.makeTemplate = function(codeObj, text, options) {
	    var template = this.makePartials(codeObj);
	    template.code = new Function('c', 'p', 'i', this.wrapMain(codeObj.code));
	    return new this.template(template, text, this, options);
	  }

	  Hogan.makePartials = function(codeObj) {
	    var key, template = {subs: {}, partials: codeObj.partials, name: codeObj.name};
	    for (key in template.partials) {
	      template.partials[key] = this.makePartials(template.partials[key]);
	    }
	    for (key in codeObj.subs) {
	      template.subs[key] = new Function('c', 'p', 't', 'i', codeObj.subs[key]);
	    }
	    return template;
	  }

	  function esc(s) {
	    return s.replace(rSlash, '\\\\')
	            .replace(rQuot, '\\\"')
	            .replace(rNewline, '\\n')
	            .replace(rCr, '\\r')
	            .replace(rLineSep, '\\u2028')
	            .replace(rParagraphSep, '\\u2029');
	  }

	  function chooseMethod(s) {
	    return (~s.indexOf('.')) ? 'd' : 'f';
	  }

	  function createPartial(node, context) {
	    var prefix = "<" + (context.prefix || "");
	    var sym = prefix + node.n + serialNo++;
	    context.partials[sym] = {name: node.n, partials: {}};
	    context.code += 't.b(t.rp("' +  esc(sym) + '",c,p,"' + (node.indent || '') + '"));';
	    return sym;
	  }

	  Hogan.codegen = {
	    '#': function(node, context) {
	      context.code += 'if(t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),' +
	                      'c,p,0,' + node.i + ',' + node.end + ',"' + node.otag + " " + node.ctag + '")){' +
	                      't.rs(c,p,' + 'function(c,p,t){';
	      Hogan.walk(node.nodes, context);
	      context.code += '});c.pop();}';
	    },

	    '^': function(node, context) {
	      context.code += 'if(!t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),c,p,1,0,0,"")){';
	      Hogan.walk(node.nodes, context);
	      context.code += '};';
	    },

	    '>': createPartial,
	    '<': function(node, context) {
	      var ctx = {partials: {}, code: '', subs: {}, inPartial: true};
	      Hogan.walk(node.nodes, ctx);
	      var template = context.partials[createPartial(node, context)];
	      template.subs = ctx.subs;
	      template.partials = ctx.partials;
	    },

	    '$': function(node, context) {
	      var ctx = {subs: {}, code: '', partials: context.partials, prefix: node.n};
	      Hogan.walk(node.nodes, ctx);
	      context.subs[node.n] = ctx.code;
	      if (!context.inPartial) {
	        context.code += 't.sub("' + esc(node.n) + '",c,p,i);';
	      }
	    },

	    '\n': function(node, context) {
	      context.code += write('"\\n"' + (node.last ? '' : ' + i'));
	    },

	    '_v': function(node, context) {
	      context.code += 't.b(t.v(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
	    },

	    '_t': function(node, context) {
	      context.code += write('"' + esc(node.text) + '"');
	    },

	    '{': tripleStache,

	    '&': tripleStache
	  }

	  function tripleStache(node, context) {
	    context.code += 't.b(t.t(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
	  }

	  function write(s) {
	    return 't.b(' + s + ');';
	  }

	  Hogan.walk = function(nodelist, context) {
	    var func;
	    for (var i = 0, l = nodelist.length; i < l; i++) {
	      func = Hogan.codegen[nodelist[i].tag];
	      func && func(nodelist[i], context);
	    }
	    return context;
	  }

	  Hogan.parse = function(tokens, text, options) {
	    options = options || {};
	    return buildTree(tokens, '', [], options.sectionTags || []);
	  }

	  Hogan.cache = {};

	  Hogan.cacheKey = function(text, options) {
	    return [text, !!options.asString, !!options.disableLambda, options.delimiters, !!options.modelGet].join('||');
	  }

	  Hogan.compile = function(text, options) {
	    options = options || {};
	    var key = Hogan.cacheKey(text, options);
	    var template = this.cache[key];

	    if (template) {
	      var partials = template.partials;
	      for (var name in partials) {
	        delete partials[name].instance;
	      }
	      return template;
	    }

	    template = this.generate(this.parse(this.scan(text, options.delimiters), text, options), text, options);
	    return this.cache[key] = template;
	  }
	})( true ? exports : Hogan);


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright 2011 Twitter, Inc.
	 *  Licensed under the Apache License, Version 2.0 (the "License");
	 *  you may not use this file except in compliance with the License.
	 *  You may obtain a copy of the License at
	 *
	 *  http://www.apache.org/licenses/LICENSE-2.0
	 *
	 *  Unless required by applicable law or agreed to in writing, software
	 *  distributed under the License is distributed on an "AS IS" BASIS,
	 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 *  See the License for the specific language governing permissions and
	 *  limitations under the License.
	 */

	var Hogan = {};

	(function (Hogan) {
	  Hogan.Template = function (codeObj, text, compiler, options) {
	    codeObj = codeObj || {};
	    this.r = codeObj.code || this.r;
	    this.c = compiler;
	    this.options = options || {};
	    this.text = text || '';
	    this.partials = codeObj.partials || {};
	    this.subs = codeObj.subs || {};
	    this.buf = '';
	  }

	  Hogan.Template.prototype = {
	    // render: replaced by generated code.
	    r: function (context, partials, indent) { return ''; },

	    // variable escaping
	    v: hoganEscape,

	    // triple stache
	    t: coerceToString,

	    render: function render(context, partials, indent) {
	      return this.ri([context], partials || {}, indent);
	    },

	    // render internal -- a hook for overrides that catches partials too
	    ri: function (context, partials, indent) {
	      return this.r(context, partials, indent);
	    },

	    // ensurePartial
	    ep: function(symbol, partials) {
	      var partial = this.partials[symbol];

	      // check to see that if we've instantiated this partial before
	      var template = partials[partial.name];
	      if (partial.instance && partial.base == template) {
	        return partial.instance;
	      }

	      if (typeof template == 'string') {
	        if (!this.c) {
	          throw new Error("No compiler available.");
	        }
	        template = this.c.compile(template, this.options);
	      }

	      if (!template) {
	        return null;
	      }

	      // We use this to check whether the partials dictionary has changed
	      this.partials[symbol].base = template;

	      if (partial.subs) {
	        // Make sure we consider parent template now
	        if (!partials.stackText) partials.stackText = {};
	        for (key in partial.subs) {
	          if (!partials.stackText[key]) {
	            partials.stackText[key] = (this.activeSub !== undefined && partials.stackText[this.activeSub]) ? partials.stackText[this.activeSub] : this.text;
	          }
	        }
	        template = createSpecializedPartial(template, partial.subs, partial.partials,
	          this.stackSubs, this.stackPartials, partials.stackText);
	      }
	      this.partials[symbol].instance = template;

	      return template;
	    },

	    // tries to find a partial in the current scope and render it
	    rp: function(symbol, context, partials, indent) {
	      var partial = this.ep(symbol, partials);
	      if (!partial) {
	        return '';
	      }

	      return partial.ri(context, partials, indent);
	    },

	    // render a section
	    rs: function(context, partials, section) {
	      var tail = context[context.length - 1];

	      if (!isArray(tail)) {
	        section(context, partials, this);
	        return;
	      }

	      for (var i = 0; i < tail.length; i++) {
	        context.push(tail[i]);
	        section(context, partials, this);
	        context.pop();
	      }
	    },

	    // maybe start a section
	    s: function(val, ctx, partials, inverted, start, end, tags) {
	      var pass;

	      if (isArray(val) && val.length === 0) {
	        return false;
	      }

	      if (typeof val == 'function') {
	        val = this.ms(val, ctx, partials, inverted, start, end, tags);
	      }

	      pass = !!val;

	      if (!inverted && pass && ctx) {
	        ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
	      }

	      return pass;
	    },

	    // find values with dotted names
	    d: function(key, ctx, partials, returnFound) {
	      var found,
	          names = key.split('.'),
	          val = this.f(names[0], ctx, partials, returnFound),
	          doModelGet = this.options.modelGet,
	          cx = null;

	      if (key === '.' && isArray(ctx[ctx.length - 2])) {
	        val = ctx[ctx.length - 1];
	      } else {
	        for (var i = 1; i < names.length; i++) {
	          found = findInScope(names[i], val, doModelGet);
	          if (found !== undefined) {
	            cx = val;
	            val = found;
	          } else {
	            val = '';
	          }
	        }
	      }

	      if (returnFound && !val) {
	        return false;
	      }

	      if (!returnFound && typeof val == 'function') {
	        ctx.push(cx);
	        val = this.mv(val, ctx, partials);
	        ctx.pop();
	      }

	      return val;
	    },

	    // find values with normal names
	    f: function(key, ctx, partials, returnFound) {
	      var val = false,
	          v = null,
	          found = false,
	          doModelGet = this.options.modelGet;

	      for (var i = ctx.length - 1; i >= 0; i--) {
	        v = ctx[i];
	        val = findInScope(key, v, doModelGet);
	        if (val !== undefined) {
	          found = true;
	          break;
	        }
	      }

	      if (!found) {
	        return (returnFound) ? false : "";
	      }

	      if (!returnFound && typeof val == 'function') {
	        val = this.mv(val, ctx, partials);
	      }

	      return val;
	    },

	    // higher order templates
	    ls: function(func, cx, partials, text, tags) {
	      var oldTags = this.options.delimiters;

	      this.options.delimiters = tags;
	      this.b(this.ct(coerceToString(func.call(cx, text)), cx, partials));
	      this.options.delimiters = oldTags;

	      return false;
	    },

	    // compile text
	    ct: function(text, cx, partials) {
	      if (this.options.disableLambda) {
	        throw new Error('Lambda features disabled.');
	      }
	      return this.c.compile(text, this.options).render(cx, partials);
	    },

	    // template result buffering
	    b: function(s) { this.buf += s; },

	    fl: function() { var r = this.buf; this.buf = ''; return r; },

	    // method replace section
	    ms: function(func, ctx, partials, inverted, start, end, tags) {
	      var textSource,
	          cx = ctx[ctx.length - 1],
	          result = func.call(cx);

	      if (typeof result == 'function') {
	        if (inverted) {
	          return true;
	        } else {
	          textSource = (this.activeSub && this.subsText && this.subsText[this.activeSub]) ? this.subsText[this.activeSub] : this.text;
	          return this.ls(result, cx, partials, textSource.substring(start, end), tags);
	        }
	      }

	      return result;
	    },

	    // method replace variable
	    mv: function(func, ctx, partials) {
	      var cx = ctx[ctx.length - 1];
	      var result = func.call(cx);

	      if (typeof result == 'function') {
	        return this.ct(coerceToString(result.call(cx)), cx, partials);
	      }

	      return result;
	    },

	    sub: function(name, context, partials, indent) {
	      var f = this.subs[name];
	      if (f) {
	        this.activeSub = name;
	        f(context, partials, this, indent);
	        this.activeSub = false;
	      }
	    }

	  };

	  //Find a key in an object
	  function findInScope(key, scope, doModelGet) {
	    var val;

	    if (scope && typeof scope == 'object') {

	      if (scope[key] !== undefined) {
	        val = scope[key];

	      // try lookup with get for backbone or similar model data
	      } else if (doModelGet && scope.get && typeof scope.get == 'function') {
	        val = scope.get(key);
	      }
	    }

	    return val;
	  }

	  function createSpecializedPartial(instance, subs, partials, stackSubs, stackPartials, stackText) {
	    function PartialTemplate() {};
	    PartialTemplate.prototype = instance;
	    function Substitutions() {};
	    Substitutions.prototype = instance.subs;
	    var key;
	    var partial = new PartialTemplate();
	    partial.subs = new Substitutions();
	    partial.subsText = {};  //hehe. substext.
	    partial.buf = '';

	    stackSubs = stackSubs || {};
	    partial.stackSubs = stackSubs;
	    partial.subsText = stackText;
	    for (key in subs) {
	      if (!stackSubs[key]) stackSubs[key] = subs[key];
	    }
	    for (key in stackSubs) {
	      partial.subs[key] = stackSubs[key];
	    }

	    stackPartials = stackPartials || {};
	    partial.stackPartials = stackPartials;
	    for (key in partials) {
	      if (!stackPartials[key]) stackPartials[key] = partials[key];
	    }
	    for (key in stackPartials) {
	      partial.partials[key] = stackPartials[key];
	    }

	    return partial;
	  }

	  var rAmp = /&/g,
	      rLt = /</g,
	      rGt = />/g,
	      rApos = /\'/g,
	      rQuot = /\"/g,
	      hChars = /[&<>\"\']/;

	  function coerceToString(val) {
	    return String((val === null || val === undefined) ? '' : val);
	  }

	  function hoganEscape(str) {
	    str = coerceToString(str);
	    return hChars.test(str) ?
	      str
	        .replace(rAmp, '&amp;')
	        .replace(rLt, '&lt;')
	        .replace(rGt, '&gt;')
	        .replace(rApos, '&#39;')
	        .replace(rQuot, '&quot;') :
	      str;
	  }

	  var isArray = Array.isArray || function(a) {
	    return Object.prototype.toString.call(a) === '[object Array]';
	  };

	})( true ? exports : Hogan);


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/*global Phaser, game, $ */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.addBlocker = addBlocker;

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _foregroundJs = __webpack_require__(4);

	var FG = _interopRequireWildcard(_foregroundJs);

	function addBlocker(type, group) {
	  var sprite = FG.spawn(group, { x: 100, y: 100, spriteKey: type });
	  //sprite = makeDragable(sprite, {onInputDown: setSelected});
	}

/***/ }
/******/ ]);