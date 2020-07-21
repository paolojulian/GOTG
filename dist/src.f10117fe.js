// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/classes/Board.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Board =
/** @class */
function () {
  function Board(width, height, rowCount, colCount) {
    this.blockSize = 100;
    this.width = width;
    this.height = height;
    this.rowCount = rowCount;
    this.colCount = colCount;
  }

  Board.prototype.draw = function (context) {
    context.beginPath();

    for (var iRow = 0; iRow < this.rowCount; iRow++) {
      for (var iCol = 0; iCol < this.colCount; iCol++) {
        context.fillStyle = (iRow + iCol) % 2 === 0 ? "#333" : "#777";
        context.fillRect(iCol * this.blockSize, iRow * this.blockSize, this.blockSize, this.blockSize);
      }
    }
  };

  return Board;
}();

exports.default = Board;
},{}],"src/classes/Pieces/Piece.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Piece =
/** @class */
function () {
  function Piece(row, col, width, height) {
    this.positionX = 0;
    this.positionY = 0;
    this.img = null;
    this.row = row;
    this.col = col;
    this.width = width;
    this.height = height;
    this.initImg();
  }
  /**
   * Overriden method
   * Initialize the image
   */


  Piece.prototype.initImg = function () {
    console.error("Piece function initImg is not set");
  };

  Piece.prototype.draw = function (ctx) {
    if (this.img === null) {
      console.error("Image of the piece was not loaded");
      return;
    }

    var imageCoords = {
      x: this.col * this.width + 10,
      y: this.row * this.height + 10
    };
    ctx.drawImage(this.img, imageCoords.x, imageCoords.y, this.width - 20, this.height - 20);
  };
  /**
   * A method that handles the piece if it is currently selected
   */


  Piece.prototype.select = function (ctx, blockSize) {
    console.log('selected');
    this.displayAvailableMoves(ctx, blockSize);
  };
  /**
   * A method that handles the piece if the user selects another piece
   */


  Piece.prototype.deselect = function () {};
  /**
   * Displays the available moves of the piece
   * Available moves are, forward, backward and sideways only
   * Rules can be seen here:
   * @see https://ggsalpakan.weebly.com/rules.html
   */


  Piece.prototype.displayAvailableMoves = function (ctx, blockSize) {
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "green";
    ctx.rect(this.col * blockSize, (this.row - 1) * blockSize, blockSize, blockSize);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "green";
    ctx.rect(this.col * blockSize, (this.row + 1) * blockSize, blockSize, blockSize);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "green";
    ctx.rect((this.col - 1) * blockSize, this.row * blockSize, blockSize, blockSize);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "green";
    ctx.rect((this.col + 1) * blockSize, this.row * blockSize, blockSize, blockSize);
    ctx.stroke();
  };

  Piece.prototype.drawForward = function () {};

  return Piece;
}();

exports.default = Piece;
},{}],"src/classes/Pieces/UnitPrivate.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Piece_1 = __importDefault(require("./Piece"));

var UnitPrivate =
/** @class */
function (_super) {
  __extends(UnitPrivate, _super);

  function UnitPrivate() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  UnitPrivate.prototype.initImg = function () {
    this.img = document.querySelector("#unit_private");
  };

  return UnitPrivate;
}(Piece_1.default);

exports.default = UnitPrivate;
},{"./Piece":"src/classes/Pieces/Piece.ts"}],"src/classes/Pieces/UnitEnemy.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Piece_1 = __importDefault(require("./Piece"));

var UnitEnemy =
/** @class */
function (_super) {
  __extends(UnitEnemy, _super);

  function UnitEnemy() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  UnitEnemy.prototype.initImg = function () {
    this.img = document.querySelector("#unit_enemy");
  };

  return UnitEnemy;
}(Piece_1.default);

exports.default = UnitEnemy;
},{"./Piece":"src/classes/Pieces/Piece.ts"}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Board_1 = __importDefault(require("./classes/Board"));

var UnitPrivate_1 = __importDefault(require("./classes/Pieces/UnitPrivate"));

var UnitEnemy_1 = __importDefault(require("./classes/Pieces/UnitEnemy"));

var CANVAS, CTX;
var gameInProgress = false;
var ROW_COUNT = 8;
var COL_COUNT = 9;
var BLOCK_SIZE = 100;
var DEFAULT_POSITIONS = {
  self: [new UnitPrivate_1.default(5, 2, BLOCK_SIZE, BLOCK_SIZE), new UnitPrivate_1.default(5, 4, BLOCK_SIZE, BLOCK_SIZE), new UnitPrivate_1.default(5, 8, BLOCK_SIZE, BLOCK_SIZE)],
  enemy: [new UnitEnemy_1.default(4, 2, BLOCK_SIZE, BLOCK_SIZE), new UnitEnemy_1.default(2, 4, BLOCK_SIZE, BLOCK_SIZE), new UnitEnemy_1.default(2, 5, BLOCK_SIZE, BLOCK_SIZE)]
};

var _startGameBtn = document.querySelector(".start-game");

var _gameDiv = document.querySelector("#game");

_startGameBtn.addEventListener("click", function () {
  if (!gameInProgress) {
    _gameDiv.classList.remove("hidden");

    initializeCanvas();
  } else {
    _gameDiv.classList.add("hidden");
  }

  gameInProgress = !gameInProgress;
});

function initializeCanvas() {
  CANVAS = document.querySelector("#canvas");
  CTX = CANVAS.getContext("2d");
  CANVAS.height = BLOCK_SIZE * ROW_COUNT;
  CANVAS.width = BLOCK_SIZE * COL_COUNT; // Clear the canvas first

  CTX.clearRect(0, 0, CANVAS.width, CANVAS.width); // Initialize the board

  var board = new Board_1.default(CANVAS.height, CANVAS.width, ROW_COUNT, COL_COUNT);
  board.draw(CTX);
  drawPieces();
  CTX.save();
  var rect = CANVAS.getBoundingClientRect();
  var currentPiece; // Add canvas click event

  CANVAS.addEventListener("click", function (e) {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    board.draw(CTX);
    drawPieces();
    var clientBlockSize = CANVAS.clientWidth / COL_COUNT;
    var boardPosX = Math.abs(e.clientX - rect.left);
    var boardPosY = Math.abs(e.clientY - rect.top);
    var posX = Math.floor(boardPosX / clientBlockSize);
    var posY = Math.floor(boardPosY / clientBlockSize);
    var piece = getPiece(posX, posY, 'self'); // Clear all rect

    if (currentPiece) {}

    if (piece) {
      currentPiece = piece; // Display valid Moves
      // Forward

      var forwardBlock = getPiece(posX, posY - 1, 'all');

      if (!forwardBlock) {
        drawMove(posX, posY - 1, "move");
      } else if (forwardBlock instanceof UnitEnemy_1.default) {
        drawMove(posX, posY - 1, "attack");
      } // Backward


      var backwardBlock = getPiece(posX, posY + 1, 'all');

      if (!backwardBlock) {
        drawMove(posX, posY + 1, "move");
      } else if (forwardBlock instanceof UnitEnemy_1.default) {
        drawMove(posX, posY + 1, "attack");
      } // Left 


      var leftBlock = getPiece(posX - 1, posY, 'all');

      if (!leftBlock) {
        drawMove(posX - 1, posY, "move");
      } else if (forwardBlock instanceof UnitEnemy_1.default) {
        drawMove(posX - 1, posY, "attack");
      } // Right


      var rightBlock = getPiece(posX + 1, posY, 'all');

      if (!rightBlock) {
        drawMove(posX + 1, posY, "move");
      } else if (forwardBlock instanceof UnitEnemy_1.default) {
        drawMove(posX + 1, posY, "attack");
      }
    }
  });
}

function drawMove(x, y, type) {
  var color;

  switch (type) {
    case "move":
      color = 'green';
      break;

    case "attack":
      color = 'red';
      break;

    default:
      throw new Error("Invalid type for drawMove");
  }

  CTX.beginPath();
  CTX.lineWidth = 4;
  CTX.strokeStyle = color;
  CTX.rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
  CTX.stroke();
}

function drawPieces() {
  // Load default positions of the pieces
  DEFAULT_POSITIONS.self.forEach(function (piece) {
    piece.draw(CTX);
  });
  DEFAULT_POSITIONS.enemy.forEach(function (piece) {
    piece.draw(CTX);
  }); // requestAnimationFrame(drawPieces);
}
/**
 * Gets the piece based on the given coordinates
 * @param col
 * @param row
 */


function getPiece(col, row, type) {
  var pieces = [];

  switch (type) {
    case "self":
      pieces = DEFAULT_POSITIONS.self;
      break;

    case "enemy":
      pieces = DEFAULT_POSITIONS.enemy;
      break;

    case "all":
      pieces = __spreadArrays(DEFAULT_POSITIONS.self, DEFAULT_POSITIONS.enemy);
      break;

    default:
      throw new Error('Invalid type for getPiece');
  }

  return pieces.find(function (piece) {
    return piece.col === col && piece.row === row;
  });
}
},{"./classes/Board":"src/classes/Board.ts","./classes/Pieces/UnitPrivate":"src/classes/Pieces/UnitPrivate.ts","./classes/Pieces/UnitEnemy":"src/classes/Pieces/UnitEnemy.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53597" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map