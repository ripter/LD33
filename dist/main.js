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

	var _startStateJs = __webpack_require__(14);

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

	var _propJs = __webpack_require__(5);

	var Prop = _interopRequireWildcard(_propJs);

	var _mobJs = __webpack_require__(7);

	var Mob = _interopRequireWildcard(_mobJs);

	var _controlsJs = __webpack_require__(8);

	var Controls = _interopRequireWildcard(_controlsJs);

	var _levelLoaderJs = __webpack_require__(10);

	var _fontsJs = __webpack_require__(13);

	var _constantsJs = __webpack_require__(6);

	var map = undefined,
	    mapName = undefined;
	var player = undefined;
	var bullets = undefined;
	var sfx = undefined;

	function init(mapName) {
	  mapName = mapName;
	}

	function preload() {
	  game.load.image('dragon', 'assets/dragon-77x91.png', 77, 91);
	  game.load.image(_constantsJs.MOB.KING, 'assets/king.png', 64, 64);
	  game.load.image(_constantsJs.MOB.KNIGHT, 'assets/knight.png', 64, 64);
	  game.load.image(_constantsJs.MOB.HORSE, 'assets/knightOnHorse.png', 64, 64);
	  game.load.image(_constantsJs.PROP.WALL, 'assets/wall.png', 64, 64);
	  game.load.image(_constantsJs.PROP.TOWER, 'assets/tower.png', 64, 64);

	  game.load.spritesheet(_constantsJs.PROP.TREE, 'assets/tree_spritesheet.png', 64, 64);
	  game.load.spritesheet(_constantsJs.PROP.SHRUB, 'assets/shrub_spritesheet.png', 64, 64);
	  game.load.spritesheet('fire', 'assets/fire_4frame_20x40.png', 20, 40);

	  game.load.image(_constantsJs.BALLOON, 'assets/balloon-32x32.png', 32, 32);

	  // backgrounds
	  game.load.image('background', 'assets/levelLayoutTest.png', 1024, 525);
	  game.load.image('bg-iphone', 'assets/bg-iphone.png', 667, 375);
	  game.load.image('curtains', 'assets/curtains.png', 667, 375);

	  game.load.audio('hit', 'assets/hit.wav');
	  game.load.audio('score', 'assets/shoot.wav');

	  // MAP
	  game.load.tilemap('iphone-map', 'assets/maps/iphone.json', null, Phaser.Tilemap.TILED_JSON);
	  game.load.image('pathSpriteSheet', 'assets/paths/pathSpriteSheet.png');
	}

	function create() {
	  game.physics.startSystem(Phaser.Physics.ARCADE);

	  game.currentScore = 0;

	  // test loading tile map
	  map = (0, _levelLoaderJs.loadTiledMap)(game, 'iphone-map');
	  window.map = game.currentMap = map;

	  //window.level = level = loadLevel(levelFile);
	  // load level!
	  window.bullets = bullets = (0, _groupsJs.physicsGroup)();

	  // Score!
	  game.textScore = game.add.text(800, 10, 'SCORE: 0', _fontsJs.headerFont);

	  // How to Play
	  game.add.text(50, 540, 'ARROW KEYS: <- move ->', _fontsJs.infoFont);
	  game.add.text(50, 560, 'SPACEBAR: [Fire]', _fontsJs.infoFont);

	  // it's curtians for you!
	  //window.curtains = game.add.image(0, 0, 'curtains');

	  // player on top of everything
	  window.player = player = (0, _dragonJs.spawnDragon)(100, 294);

	  //
	  // Start the action!
	  Mob.startTimedGame(map.mobGroup);

	  // sounds
	  window.sfx = sfx = {
	    hit: game.add.audio('hit'),
	    score: game.add.audio('score')
	  };
	}

	function update() {
	  var _map = map;
	  var mobGroup = _map.mobGroup;
	  var balloonGroup = _map.balloonGroup;
	  var propGroup = _map.propGroup;
	  var ESC = Phaser.Keyboard.ESC;

	  Controls.update(game, player);

	  game.physics.arcade.overlap(bullets, mobGroup, collideBulletMob);
	  game.physics.arcade.overlap(bullets, propGroup, collideBulletProp);
	  game.physics.arcade.collide(mobGroup, balloonGroup, collideMobBalloon);

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

	  Prop.onHit(prop);
	}

	function collideBulletMob(bullet, mob) {
	  // Phaser will call this each click they collide.
	  // We only care about the first time, when the bullet it alive.
	  if (!bullet.alive) {
	    return;
	  }

	  var _map2 = map;
	  var mobGroup = _map2.mobGroup;

	  var points = mob.points || 1;

	  bullet.kill();
	  mob.kill();
	  updateScore(points);
	  sfx.score.play();

	  // Game Over check
	  if (mobGroup.countLiving() === 0) {
	    game.state.start('end', true, false, 'win');
	  }
	}

	function collideMobBalloon(mob, balloon) {
	  var _map3 = map;
	  var balloonGroup = _map3.balloonGroup;

	  balloon.kill();

	  if (balloonGroup.countLiving() === 0) {
	    game.state.start('end');
	  }
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.addAnimation = addAnimation;
	exports.onHit = onHit;

	var _constantsJs = __webpack_require__(6);

	function addAnimation(sprite) {
	  var type = sprite.name; //Tiled calls it name instead of type

	  switch (type) {
	    case _constantsJs.PROP.SHRUB:
	      toShrub(sprite);
	      break;
	    case _constantsJs.PROP.TREE:
	      toTree(sprite);
	      break;
	  }

	  return sprite;
	}

	;

	function onHit(sprite) {
	  var type = sprite.name; //Tiled calls it name instead of type

	  switch (type) {
	    case _constantsJs.PROP.SHRUB:
	      hitShrub(sprite);
	      break;

	    case _constantsJs.PROP.TREE:
	      hitTree(sprite);
	      break;
	  }

	  return sprite;
	}

	//
	// Add animation
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

	//
	// Hit methods
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

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var MOB = {
	  KNIGHT: 'MOB_KNIGHT',
	  KING: 'MOB_KING',
	  HORSE: 'MOB_HORSE'
	};

	exports.MOB = MOB;
	var MAP = {
	  WAYPOINTS: 'MAP_WAYPOINTS',
	  LAYER: {
	    PATH: 'MAP_LAYER_PATH',
	    MOBS: 'mobs',
	    BALLOONS: 'balloons',
	    PROPS: 'props'
	  }
	};

	exports.MAP = MAP;
	var BALLOON = 'BALLOON';

	exports.BALLOON = BALLOON;
	var PROP = {
	  SHRUB: 'PROP_SHRUB',
	  TREE: 'PROP_TREE',
	  WALL: 'PROP_WALL',
	  TOWER: 'PROP_TOWER'
	};
	exports.PROP = PROP;

/***/ },
/* 7 */
/***/ function(module, exports) {

	/*global Phaser, game */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.spawn = spawn;
	exports.createPathTween = createPathTween;
	exports.startTimedGame = startTimedGame;
	var DELAY = Phaser.Timer.SECOND;
	var SPEED = Phaser.Timer.SECOND * 15;
	var HIT_RANGE = 5;

	// Spawn a new sprite in the group.

	function spawn(group, data, waypoints) {
	  var spriteKey = data.spriteKey;

	  var sprite = group.create(0, 0, spriteKey);

	  sprite.alive = false;
	  sprite.visible = false;
	  sprite.anchor = { x: .5, y: 1 };
	  sprite.body.moves = false; // use tweens
	  sprite.data = data;
	  //sprite.pathTween = createPathTween(sprite, waypoints);

	  return sprite;
	}

	// Create tween between all points in the path.

	function createPathTween(sprite, map) {
	  var game = sprite.game;
	  var speed = sprite.speed || SPEED;
	  var pathName = sprite.pathName;
	  var pathTween = game.add.tween(sprite);
	  var _map$objects$pathName$0 = map.objects[pathName][0];
	  var x = _map$objects$pathName$0.x;
	  var y = _map$objects$pathName$0.y;
	  var polyline = _map$objects$pathName$0.polyline;

	  // We want:
	  //     {x: [0, 273, 0 ...], y: [50, 55, 142, ...]}
	  var sx = polyline.map(function (point) {
	    return point[0] + x;
	  });
	  var sy = polyline.map(function (point) {
	    return point[1] + y;
	  });

	  // speed is per point. So points that are further away will cause
	  // the sprite to move faster.
	  // On the plus, we can control speed via points.
	  // Options:
	  //  set speed as a function of distance between points.
	  //  allow sprite to adjust the speed
	  //  allow points to set/adjust the speed
	  pathTween.to({ x: sx, y: sy }, speed);
	  sprite.pathTween = pathTween;
	  return sprite;
	}

	// start the timed game

	function startTimedGame(mobGroup) {
	  var length = mobGroup.length;
	  var index = 0;

	  // activate/reset one human at a time with a time delay
	  game.time.events.repeat(DELAY, length, function () {
	    var mob = mobGroup.getAt(index);

	    mob.reset(0, 0);
	    mob.pathTween.start().loop(true);

	    // Keep our own index
	    index += 1;
	  });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*global Phaser */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.update = update;

	var _fireJs = __webpack_require__(4);

	var _utilJs = __webpack_require__(9);

	var MOVE_DELAY = 300;
	var FIRE_DELAY = 500;
	var atMoveSpeed = (0, _utilJs.debounce)(MOVE_DELAY);
	var atFireSpeed = (0, _utilJs.debounce)(FIRE_DELAY);

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

	        // Limit the fire speed on top of the movement speed.
	        atFireSpeed(game.time.events, function () {
	          (0, _fireJs.spawnFire)(x, y);
	        });
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

/***/ },
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*global Phaser, game, bullets */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.loadLevel = loadLevel;
	exports.loadTiledMap = loadTiledMap;

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _mobJs = __webpack_require__(7);

	var Mob = _interopRequireWildcard(_mobJs);

	var _foregroundJs = __webpack_require__(11);

	var Foreground = _interopRequireWildcard(_foregroundJs);

	var _propJs = __webpack_require__(5);

	var Prop = _interopRequireWildcard(_propJs);

	var _balloonJs = __webpack_require__(12);

	var Balloon = _interopRequireWildcard(_balloonJs);

	var _constantsJs = __webpack_require__(6);

	// Groups with physics.

	var _groupsJs = __webpack_require__(2);

	// Load the level from a lvl object.

	function loadLevel(lvl) {
	  // These are in order by z-index
	  var background = game.add.image(0, 0, lvl.background);
	  var mobGroup = spawnMobGroup(lvl.mobs, lvl.waypoints);
	  var fgGroup = spawnForegroundGroup(lvl.foreground);
	  var balloonGroup = spawnBalloonGroup(lvl.balloons);

	  return {
	    background: background,
	    score: 0,
	    mobGroup: mobGroup,
	    fgGroup: fgGroup,
	    balloons: balloonGroup
	  };
	}

	function spawnMobGroup(mobList, waypoints) {
	  var group = (0, _groupsJs.physicsGroup)();

	  mobList.forEach(function (mobData) {
	    var pathName = mobData.pathName;
	    var sprite = Mob.spawn(group, mobData, waypoints[pathName]);
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

	function loadTiledMap(game, mapKey) {
	  var map = game.add.tilemap(mapKey);
	  var props = map.properties;
	  var layer = undefined,
	      mobGroup = undefined,
	      balloonGroup = undefined,
	      propGroup = undefined;

	  // Background image
	  map.properties.background = game.add.image(0, 0, props.background);

	  // WARNING: Hardcoded values!
	  map.addTilesetImage('paths', 'pathSpriteSheet');
	  layer = map.createLayer(_constantsJs.MAP.LAYER.PATH);
	  //layer.resizeWorld();

	  //
	  // Mob group!
	  mobGroup = (0, _groupsJs.physicsGroup)();
	  // Get the mobs from the map and create them.
	  Object.keys(_constantsJs.MOB).forEach(function (key) {
	    map.createFromObjects(_constantsJs.MAP.LAYER.MOBS, _constantsJs.MOB[key], _constantsJs.MOB[key], null, true, false, mobGroup);
	  });
	  // set standard properties
	  //mobGroup.setAll('anchor', {x: .25, y: .85});
	  mobGroup.setAll('anchor', { x: .5, y: 1 });
	  mobGroup.setAll('body.moves', false);
	  mobGroup.forEach(Mob.createPathTween, null, false, map);

	  //
	  // Props group
	  propGroup = (0, _groupsJs.physicsGroup)();
	  // Get all the prop types from the PROP and create each type.
	  Object.keys(_constantsJs.PROP).forEach(function (key) {
	    map.createFromObjects(_constantsJs.MAP.LAYER.PROPS, _constantsJs.PROP[key], _constantsJs.PROP[key], null, true, false, propGroup);
	  });
	  // set standard properties
	  propGroup.setAll('anchor', { x: .25, y: .85 });
	  propGroup.setAll('body.moves', false);
	  propGroup.forEach(Prop.addAnimation);

	  //
	  // Balloon!
	  balloonGroup = (0, _groupsJs.physicsGroup)();
	  map.createFromObjects(_constantsJs.MAP.LAYER.BALLOONS, _constantsJs.BALLOON, _constantsJs.BALLOON, null, true, false, balloonGroup);

	  return {
	    map: map,
	    mobGroup: mobGroup,
	    balloonGroup: balloonGroup,
	    propGroup: propGroup
	  };
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
/* 12 */
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
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/*global Phaser, game */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _fontsJs = __webpack_require__(13);

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

	  // Tap to Start
	  if (game.input.activePointer.isDown) {
	    game.state.start('game', true, false, 'iphone-map');
	  }
	}
	exports['default'] = {
	  preload: preload,
	  create: create,
	  update: update
	};
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/*global Phaser, game */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _fontsJs = __webpack_require__(13);

	var _gameStateJs = __webpack_require__(1);

	var _levelsIphoneJs = __webpack_require__(16);

	var _levelsIphoneJs2 = _interopRequireDefault(_levelsIphoneJs);

	var didWin = false;

	//
	// Lifecycle
	//
	function init(gameStatus) {
	  if (gameStatus === 'win') {
	    didWin = true;
	  }
	}

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
	    game.state.start('game', true, false, _levelsIphoneJs2['default']);
	  }
	}

	function addGameOver() {
	  var score = game.currentScore;

	  if (didWin) {
	    game.add.text(100, 100, 'You WIN!', _fontsJs.headerFont);
	    game.add.image(400, 100, 'stuffedPrincess');
	  } else {
	    game.add.text(100, 100, 'You LOST!', _fontsJs.headerFont);
	    game.add.image(400, 100, 'carnie');
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
	  update: update,
	  init: init
	};
	module.exports = exports['default'];

/***/ },
/* 16 */
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
	    altPath: [{ x: 604, y: 0 }, { x: 577, y: 56 }, { x: 357, y: 57 }, { x: 306, y: 101 }
	    //, {x:284, y:145}
	    , { x: 285, y: 193 }
	    //, {x:305, y:229}
	    , { x: 346, y: 264 }, { x: 582, y: 256 }, { x: 621, y: 342 }]
	  },
	  mobs: [{ spriteKey: 'knight', pathName: 'mainPath' }, { spriteKey: 'knight', pathName: 'altPath' }],
	  foreground: [{ x: 438, y: 240, spriteKey: 'tree' }],
	  balloons: [{ x: 500, y: 342, spriteKey: 'balloon' }]
	};
	exports['default'] = level;
	module.exports = exports['default'];

/***/ }
/******/ ]);