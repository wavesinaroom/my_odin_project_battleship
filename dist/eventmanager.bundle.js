"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["eventmanager"],{

/***/ "./src/eventmanager.js":
/*!*****************************!*\
  !*** ./src/eventmanager.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventManager": () => (/* binding */ EventManager)
/* harmony export */ });
/* harmony import */ var _gamemanager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gamemanager */ "./src/gamemanager.js");



const EventManager = {
  gameManager: _gamemanager__WEBPACK_IMPORTED_MODULE_0__.GameManager,
  notifyAttack(who, coordinate){
    if(!who)
      throw new Error(`Unknown player`);
    else if(who!==_gamemanager__WEBPACK_IMPORTED_MODULE_0__.GameManager.turn)
      throw new Error(`Invalid turn`);
    else
      who === `CPU` ? _gamemanager__WEBPACK_IMPORTED_MODULE_0__.GameManager.player.board.getAttack(coordinate):_gamemanager__WEBPACK_IMPORTED_MODULE_0__.GameManager.cpu.board.getAttack(coordinate);
    _gamemanager__WEBPACK_IMPORTED_MODULE_0__.GameManager.changeTurn(who);
  }
}


/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameBoard": () => (/* binding */ GameBoard),
/* harmony export */   "coordinate": () => (/* binding */ coordinate),
/* harmony export */   "shipOrientation": () => (/* binding */ shipOrientation),
/* harmony export */   "tile": () => (/* binding */ tile)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");



function coordinate(x,y){
  const boardSize = 10;
  if(x > boardSize || x < 1)
    throw new Error(`X coordinate is out of boundaries`);
  if(y > boardSize || y < 1)
    throw new Error(`Y coordinate is out of boundaries`);
  return{x:x, y:y}
}

function tile(coordinate, id){
  return{coordinate: coordinate, id: id}
}

const shipOrientation = {
  HORIZONTAL: Symbol(`horizontal`),
  VERTICAL: Symbol(`vertical`),
}

const gameboardActions = {
  placeShips(shipType, orientation, inputCoordinate){
    const ship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(shipType);
    ship.ID = `${inputCoordinate.x},${inputCoordinate.y}`;
  
    this.tiles.forEach(tile=>{
      if(tile.coordinate.x === inputCoordinate.x && tile.coordinate.y === inputCoordinate.y)
      throw new Error(`There's already an object on that input coordinate`);
    })

    if(orientation === shipOrientation.HORIZONTAL){
      if(inputCoordinate.x + ship.length > this.size)
        throw new Error(`Part of ship is out of board X boundary`);
      for(let i = 0; i<ship.length; ++i)
        this.tiles.push(tile(coordinate(inputCoordinate.x+i, inputCoordinate.y), `${ship.ID}`));
    }else if(orientation === shipOrientation.VERTICAL){
      if(inputCoordinate.y + ship.length > this.size)
        throw new Error(`Part of ship is out of board Y boundary`);
      for(let i = 0; i<ship.length; ++i)
        this.tiles.push(tile(coordinate(inputCoordinate.x, inputCoordinate.y+i), `${ship.ID}`));
    }else
      throw new Error(`Undefined ship orientation`);

    this.shipsLog.set(`${ship.ID}`,ship);
  },

  getAttack(inputCoordinate){
    let isShip, ID;
    this.tiles.forEach(tile=>{
      if(tile.coordinate.y===inputCoordinate.y&&tile.coordinate.x===inputCoordinate.x&&tile.id){
        ID = tile.id;
        return isShip = true;
      }
    })

    if(isShip){
      this.shipsLog.get(ID).hit()
      if(this.shipsLog.get(ID).isSunk){
        this.removeShip(ID);
        this.checkSunkFleet();
      }
    }else
      this.tiles.push(tile(inputCoordinate, undefined));
  },

  removeShip(ID){
    this.shipsLog.delete(ID);
    for(let i = 0; i<this.tiles.length; ++i)
      if(this.tiles[i].id===ID)
        this.tiles.splice(i,1);
  },

  checkSunkFleet(){
    this.shipsLog.size === 0 ? this.sunkFleet=true:this.sunkFleet=false;
  }

}


function GameBoard (){
  const gameboard = Object.create(gameboardActions);
  gameboard.shipsLog = new Map();
  gameboard.tiles= []; 
  gameboard.size= 10;
  gameboard.sunkFleet = false;

    return gameboard;
}




/***/ }),

/***/ "./src/gamemanager.js":
/*!****************************!*\
  !*** ./src/gamemanager.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameManager": () => (/* binding */ GameManager)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
 


const GameManager = {
  turn: undefined,
  player: undefined,
  cpu: undefined,
  
  setUpGame(name){
    if(!name)
      throw new Error(`Player needs a name`);
    this.player = (0,_player__WEBPACK_IMPORTED_MODULE_0__.Player)(name);
    this.turn = this.player.name;
    this.cpu = (0,_player__WEBPACK_IMPORTED_MODULE_0__.Player)();
  },

  changeTurn(who){
    if(this.player.board.sunkFleet||this.cpu.board.sunkFleet)
      this.gameOver();
    else
      who === this.cpu.name? this.turn = this.player.name : this.turn = this.cpu.name;

    if(this.turn === `CPU`)
      this.cpu.fire();
  },

  gameOver(){
    this.player = undefined;
    this.cpu = undefined;
  }

}


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _eventmanager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventmanager */ "./src/eventmanager.js");
/* harmony import */ var _gamemanager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gamemanager */ "./src/gamemanager.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ship */ "./src/ship.js");






const playerActions = {
  fire(coordinate){
    _eventmanager__WEBPACK_IMPORTED_MODULE_1__.EventManager.notifyAttack(this.name, coordinate);
  }
}

const cpuActions = {
  fire(){
    let attackCoord = this.randomCoordinate();
    if(this.board.tiles.includes(attackCoord))
      attackCoord = this.randomCoordinate();

    _eventmanager__WEBPACK_IMPORTED_MODULE_1__.EventManager.notifyAttack(this.name, attackCoord);
  },

  randomCoordinate(){
    const boardSize = _gamemanager__WEBPACK_IMPORTED_MODULE_2__.GameManager.cpu.board.size;
    const minTileNum = 1;
    return (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.coordinate)(Math.floor(Math.random()*(boardSize-minTileNum)+minTileNum),Math.floor(Math.random()*(boardSize-minTileNum)+minTileNum));
  },

  placeRandomShip(){
    const randomShipOrienNum = Math.floor(Math.random());
    const randomShipTypeNum = Math.floor(Math.random()*3);
    
    let randomShipOrientation, randomShipType;

    randomShipOrienNum === 1 ? randomShipOrientation = _gameboard__WEBPACK_IMPORTED_MODULE_0__.shipOrientation.HORIZONTAL : randomShipOrientation = _gameboard__WEBPACK_IMPORTED_MODULE_0__.shipOrientation.VERTICAL;

    switch(randomShipTypeNum){
      case 0:
        randomShipType = _ship__WEBPACK_IMPORTED_MODULE_3__.shipType.CARRIER;
        break;
      case 1:
        randomShipType = _ship__WEBPACK_IMPORTED_MODULE_3__.shipType.BATTLESHIP;
        break;
      case 2:
        randomShipType = _ship__WEBPACK_IMPORTED_MODULE_3__.shipType.CRUISER;
        break;
      case 3:
        randomShipType = _ship__WEBPACK_IMPORTED_MODULE_3__.shipType.DESTROYER;
        break;
      default:
        throw new Error(`Unable to get a random ship type`)
    }

    this.board.placeShips(randomShipType,randomShipOrientation, this.randomCoordinate());
  }

}

function Player(name){
  let player;
  if(name){
    player = Object.create(playerActions);
    player.name = name;
  }else{
    player = Object.create(cpuActions);
    player.name = `CPU`;
  }
  player.board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.GameBoard)();
  return player;
}




/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship),
/* harmony export */   "shipType": () => (/* binding */ shipType)
/* harmony export */ });


const shipType = {
  CARRIER: Symbol(`carrier`),
  BATTLESHIP: Symbol(`battleship`),
  CRUISER: Symbol(`cruiser`),
  DESTROYER: Symbol(`destroyer`),
}


const shipActions = {
  hit(){
    if(this.isSunk&&this.hitPoints>this.length)
      throw new Error(`Ship should've been destroyed by now`);

    ++this.hitPoints;
    this.checkShipState();
  },
  checkShipState(){
    if(this.hitPoints==this.length)
      return this.isSunk = true;
  }
}

function Ship(type){

  const ship = Object.create(shipActions); 
  ship.hitPoints = 0;
  ship.isSunk = false;
  ship.ID = undefined;

  switch(type){
    case(shipType.CARRIER):
      ship.length = 5;
      break;
    case(shipType.BATTLESHIP):
      ship.length = 4;
      break;
    case(shipType.CRUISER):
      ship.length = 3;
      break;
    case(shipType.DESTROYER):
      ship.length = 2;
      break;
    default:
      throw new Error(`Can't create ship without a specific ship type`);
  }
  return ship;
}



/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/eventmanager.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRtYW5hZ2VyLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUF5QztBQUNwQjs7QUFFckI7QUFDQSxlQUFlLHFEQUFXO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiwwREFBZ0I7QUFDbEM7QUFDQTtBQUNBLHNCQUFzQiw0RUFBa0MsYUFBYSx5RUFBK0I7QUFDcEcsSUFBSSxnRUFBc0I7QUFDMUI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2Q4QjtBQUN1Qjs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsMkNBQUk7QUFDckIsaUJBQWlCLGtCQUFrQixHQUFHLGtCQUFrQjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGVBQWU7QUFDcEMsb0ZBQW9GLFFBQVE7QUFDNUYsS0FBSztBQUNMO0FBQ0E7QUFDQSxxQkFBcUIsZUFBZTtBQUNwQyxvRkFBb0YsUUFBUTtBQUM1RixLQUFLO0FBQ0w7O0FBRUEseUJBQXlCLFFBQVE7QUFDakMsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsbUJBQW1CLHFCQUFxQjtBQUN4QztBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4RmdDO0FBQ1o7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsK0NBQU07QUFDeEI7QUFDQSxlQUFlLCtDQUFNO0FBQ3JCLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9CbUU7QUFDckI7QUFDSjtBQUNWO0FBQ2pCOztBQUVmO0FBQ0E7QUFDQSxJQUFJLG9FQUF5QjtBQUM3QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSSxvRUFBeUI7QUFDN0IsR0FBRzs7QUFFSDtBQUNBLHNCQUFzQixvRUFBMEI7QUFDaEQ7QUFDQSxXQUFXLHNEQUFVO0FBQ3JCLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1REFBdUQsa0VBQTBCLDJCQUEyQixnRUFBd0I7O0FBRXBJO0FBQ0E7QUFDQSx5QkFBeUIsbURBQWdCO0FBQ3pDO0FBQ0E7QUFDQSx5QkFBeUIsc0RBQW1CO0FBQzVDO0FBQ0E7QUFDQSx5QkFBeUIsbURBQWdCO0FBQ3pDO0FBQ0E7QUFDQSx5QkFBeUIscURBQWtCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIscURBQVM7QUFDMUI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEV1Qjs7QUFFdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9ldmVudG1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lbWFuYWdlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtHYW1lTWFuYWdlcn0gZnJvbSAnLi9nYW1lbWFuYWdlcidcbmV4cG9ydCB7RXZlbnRNYW5hZ2VyfVxuXG5jb25zdCBFdmVudE1hbmFnZXIgPSB7XG4gIGdhbWVNYW5hZ2VyOiBHYW1lTWFuYWdlcixcbiAgbm90aWZ5QXR0YWNrKHdobywgY29vcmRpbmF0ZSl7XG4gICAgaWYoIXdobylcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBwbGF5ZXJgKTtcbiAgICBlbHNlIGlmKHdobyE9PUdhbWVNYW5hZ2VyLnR1cm4pXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgdHVybmApO1xuICAgIGVsc2VcbiAgICAgIHdobyA9PT0gYENQVWAgPyBHYW1lTWFuYWdlci5wbGF5ZXIuYm9hcmQuZ2V0QXR0YWNrKGNvb3JkaW5hdGUpOkdhbWVNYW5hZ2VyLmNwdS5ib2FyZC5nZXRBdHRhY2soY29vcmRpbmF0ZSk7XG4gICAgR2FtZU1hbmFnZXIuY2hhbmdlVHVybih3aG8pO1xuICB9XG59XG4iLCJpbXBvcnQgeyAgU2hpcCB9IGZyb20gXCIuL3NoaXBcIlxuZXhwb3J0IHtHYW1lQm9hcmQsIGNvb3JkaW5hdGUsIHNoaXBPcmllbnRhdGlvbiwgdGlsZX1cblxuZnVuY3Rpb24gY29vcmRpbmF0ZSh4LHkpe1xuICBjb25zdCBib2FyZFNpemUgPSAxMDtcbiAgaWYoeCA+IGJvYXJkU2l6ZSB8fCB4IDwgMSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFggY29vcmRpbmF0ZSBpcyBvdXQgb2YgYm91bmRhcmllc2ApO1xuICBpZih5ID4gYm9hcmRTaXplIHx8IHkgPCAxKVxuICAgIHRocm93IG5ldyBFcnJvcihgWSBjb29yZGluYXRlIGlzIG91dCBvZiBib3VuZGFyaWVzYCk7XG4gIHJldHVybnt4OngsIHk6eX1cbn1cblxuZnVuY3Rpb24gdGlsZShjb29yZGluYXRlLCBpZCl7XG4gIHJldHVybntjb29yZGluYXRlOiBjb29yZGluYXRlLCBpZDogaWR9XG59XG5cbmNvbnN0IHNoaXBPcmllbnRhdGlvbiA9IHtcbiAgSE9SSVpPTlRBTDogU3ltYm9sKGBob3Jpem9udGFsYCksXG4gIFZFUlRJQ0FMOiBTeW1ib2woYHZlcnRpY2FsYCksXG59XG5cbmNvbnN0IGdhbWVib2FyZEFjdGlvbnMgPSB7XG4gIHBsYWNlU2hpcHMoc2hpcFR5cGUsIG9yaWVudGF0aW9uLCBpbnB1dENvb3JkaW5hdGUpe1xuICAgIGNvbnN0IHNoaXAgPSBTaGlwKHNoaXBUeXBlKTtcbiAgICBzaGlwLklEID0gYCR7aW5wdXRDb29yZGluYXRlLnh9LCR7aW5wdXRDb29yZGluYXRlLnl9YDtcbiAgXG4gICAgdGhpcy50aWxlcy5mb3JFYWNoKHRpbGU9PntcbiAgICAgIGlmKHRpbGUuY29vcmRpbmF0ZS54ID09PSBpbnB1dENvb3JkaW5hdGUueCAmJiB0aWxlLmNvb3JkaW5hdGUueSA9PT0gaW5wdXRDb29yZGluYXRlLnkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZXJlJ3MgYWxyZWFkeSBhbiBvYmplY3Qgb24gdGhhdCBpbnB1dCBjb29yZGluYXRlYCk7XG4gICAgfSlcblxuICAgIGlmKG9yaWVudGF0aW9uID09PSBzaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTCl7XG4gICAgICBpZihpbnB1dENvb3JkaW5hdGUueCArIHNoaXAubGVuZ3RoID4gdGhpcy5zaXplKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcnQgb2Ygc2hpcCBpcyBvdXQgb2YgYm9hcmQgWCBib3VuZGFyeWApO1xuICAgICAgZm9yKGxldCBpID0gMDsgaTxzaGlwLmxlbmd0aDsgKytpKVxuICAgICAgICB0aGlzLnRpbGVzLnB1c2godGlsZShjb29yZGluYXRlKGlucHV0Q29vcmRpbmF0ZS54K2ksIGlucHV0Q29vcmRpbmF0ZS55KSwgYCR7c2hpcC5JRH1gKSk7XG4gICAgfWVsc2UgaWYob3JpZW50YXRpb24gPT09IHNoaXBPcmllbnRhdGlvbi5WRVJUSUNBTCl7XG4gICAgICBpZihpbnB1dENvb3JkaW5hdGUueSArIHNoaXAubGVuZ3RoID4gdGhpcy5zaXplKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcnQgb2Ygc2hpcCBpcyBvdXQgb2YgYm9hcmQgWSBib3VuZGFyeWApO1xuICAgICAgZm9yKGxldCBpID0gMDsgaTxzaGlwLmxlbmd0aDsgKytpKVxuICAgICAgICB0aGlzLnRpbGVzLnB1c2godGlsZShjb29yZGluYXRlKGlucHV0Q29vcmRpbmF0ZS54LCBpbnB1dENvb3JkaW5hdGUueStpKSwgYCR7c2hpcC5JRH1gKSk7XG4gICAgfWVsc2VcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5kZWZpbmVkIHNoaXAgb3JpZW50YXRpb25gKTtcblxuICAgIHRoaXMuc2hpcHNMb2cuc2V0KGAke3NoaXAuSUR9YCxzaGlwKTtcbiAgfSxcblxuICBnZXRBdHRhY2soaW5wdXRDb29yZGluYXRlKXtcbiAgICBsZXQgaXNTaGlwLCBJRDtcbiAgICB0aGlzLnRpbGVzLmZvckVhY2godGlsZT0+e1xuICAgICAgaWYodGlsZS5jb29yZGluYXRlLnk9PT1pbnB1dENvb3JkaW5hdGUueSYmdGlsZS5jb29yZGluYXRlLng9PT1pbnB1dENvb3JkaW5hdGUueCYmdGlsZS5pZCl7XG4gICAgICAgIElEID0gdGlsZS5pZDtcbiAgICAgICAgcmV0dXJuIGlzU2hpcCA9IHRydWU7XG4gICAgICB9XG4gICAgfSlcblxuICAgIGlmKGlzU2hpcCl7XG4gICAgICB0aGlzLnNoaXBzTG9nLmdldChJRCkuaGl0KClcbiAgICAgIGlmKHRoaXMuc2hpcHNMb2cuZ2V0KElEKS5pc1N1bmspe1xuICAgICAgICB0aGlzLnJlbW92ZVNoaXAoSUQpO1xuICAgICAgICB0aGlzLmNoZWNrU3Vua0ZsZWV0KCk7XG4gICAgICB9XG4gICAgfWVsc2VcbiAgICAgIHRoaXMudGlsZXMucHVzaCh0aWxlKGlucHV0Q29vcmRpbmF0ZSwgdW5kZWZpbmVkKSk7XG4gIH0sXG5cbiAgcmVtb3ZlU2hpcChJRCl7XG4gICAgdGhpcy5zaGlwc0xvZy5kZWxldGUoSUQpO1xuICAgIGZvcihsZXQgaSA9IDA7IGk8dGhpcy50aWxlcy5sZW5ndGg7ICsraSlcbiAgICAgIGlmKHRoaXMudGlsZXNbaV0uaWQ9PT1JRClcbiAgICAgICAgdGhpcy50aWxlcy5zcGxpY2UoaSwxKTtcbiAgfSxcblxuICBjaGVja1N1bmtGbGVldCgpe1xuICAgIHRoaXMuc2hpcHNMb2cuc2l6ZSA9PT0gMCA/IHRoaXMuc3Vua0ZsZWV0PXRydWU6dGhpcy5zdW5rRmxlZXQ9ZmFsc2U7XG4gIH1cblxufVxuXG5cbmZ1bmN0aW9uIEdhbWVCb2FyZCAoKXtcbiAgY29uc3QgZ2FtZWJvYXJkID0gT2JqZWN0LmNyZWF0ZShnYW1lYm9hcmRBY3Rpb25zKTtcbiAgZ2FtZWJvYXJkLnNoaXBzTG9nID0gbmV3IE1hcCgpO1xuICBnYW1lYm9hcmQudGlsZXM9IFtdOyBcbiAgZ2FtZWJvYXJkLnNpemU9IDEwO1xuICBnYW1lYm9hcmQuc3Vua0ZsZWV0ID0gZmFsc2U7XG5cbiAgICByZXR1cm4gZ2FtZWJvYXJkO1xufVxuXG5cbiIsImltcG9ydCB7UGxheWVyfSBmcm9tIFwiLi9wbGF5ZXJcIjsgXG5leHBvcnQge0dhbWVNYW5hZ2VyfVxuXG5jb25zdCBHYW1lTWFuYWdlciA9IHtcbiAgdHVybjogdW5kZWZpbmVkLFxuICBwbGF5ZXI6IHVuZGVmaW5lZCxcbiAgY3B1OiB1bmRlZmluZWQsXG4gIFxuICBzZXRVcEdhbWUobmFtZSl7XG4gICAgaWYoIW5hbWUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFBsYXllciBuZWVkcyBhIG5hbWVgKTtcbiAgICB0aGlzLnBsYXllciA9IFBsYXllcihuYW1lKTtcbiAgICB0aGlzLnR1cm4gPSB0aGlzLnBsYXllci5uYW1lO1xuICAgIHRoaXMuY3B1ID0gUGxheWVyKCk7XG4gIH0sXG5cbiAgY2hhbmdlVHVybih3aG8pe1xuICAgIGlmKHRoaXMucGxheWVyLmJvYXJkLnN1bmtGbGVldHx8dGhpcy5jcHUuYm9hcmQuc3Vua0ZsZWV0KVxuICAgICAgdGhpcy5nYW1lT3ZlcigpO1xuICAgIGVsc2VcbiAgICAgIHdobyA9PT0gdGhpcy5jcHUubmFtZT8gdGhpcy50dXJuID0gdGhpcy5wbGF5ZXIubmFtZSA6IHRoaXMudHVybiA9IHRoaXMuY3B1Lm5hbWU7XG5cbiAgICBpZih0aGlzLnR1cm4gPT09IGBDUFVgKVxuICAgICAgdGhpcy5jcHUuZmlyZSgpO1xuICB9LFxuXG4gIGdhbWVPdmVyKCl7XG4gICAgdGhpcy5wbGF5ZXIgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5jcHUgPSB1bmRlZmluZWQ7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtjb29yZGluYXRlLCBHYW1lQm9hcmQsIHNoaXBPcmllbnRhdGlvbn0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IHsgRXZlbnRNYW5hZ2VyIH0gZnJvbSAnLi9ldmVudG1hbmFnZXInO1xuaW1wb3J0IHtHYW1lTWFuYWdlcn0gZnJvbSAnLi9nYW1lbWFuYWdlcic7XG5pbXBvcnQge3NoaXBUeXBlfSBmcm9tICcuL3NoaXAnO1xuZXhwb3J0IHtQbGF5ZXJ9XG5cbmNvbnN0IHBsYXllckFjdGlvbnMgPSB7XG4gIGZpcmUoY29vcmRpbmF0ZSl7XG4gICAgRXZlbnRNYW5hZ2VyLm5vdGlmeUF0dGFjayh0aGlzLm5hbWUsIGNvb3JkaW5hdGUpO1xuICB9XG59XG5cbmNvbnN0IGNwdUFjdGlvbnMgPSB7XG4gIGZpcmUoKXtcbiAgICBsZXQgYXR0YWNrQ29vcmQgPSB0aGlzLnJhbmRvbUNvb3JkaW5hdGUoKTtcbiAgICBpZih0aGlzLmJvYXJkLnRpbGVzLmluY2x1ZGVzKGF0dGFja0Nvb3JkKSlcbiAgICAgIGF0dGFja0Nvb3JkID0gdGhpcy5yYW5kb21Db29yZGluYXRlKCk7XG5cbiAgICBFdmVudE1hbmFnZXIubm90aWZ5QXR0YWNrKHRoaXMubmFtZSwgYXR0YWNrQ29vcmQpO1xuICB9LFxuXG4gIHJhbmRvbUNvb3JkaW5hdGUoKXtcbiAgICBjb25zdCBib2FyZFNpemUgPSBHYW1lTWFuYWdlci5jcHUuYm9hcmQuc2l6ZTtcbiAgICBjb25zdCBtaW5UaWxlTnVtID0gMTtcbiAgICByZXR1cm4gY29vcmRpbmF0ZShNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKGJvYXJkU2l6ZS1taW5UaWxlTnVtKSttaW5UaWxlTnVtKSxNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKGJvYXJkU2l6ZS1taW5UaWxlTnVtKSttaW5UaWxlTnVtKSk7XG4gIH0sXG5cbiAgcGxhY2VSYW5kb21TaGlwKCl7XG4gICAgY29uc3QgcmFuZG9tU2hpcE9yaWVuTnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKTtcbiAgICBjb25zdCByYW5kb21TaGlwVHlwZU51bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSozKTtcbiAgICBcbiAgICBsZXQgcmFuZG9tU2hpcE9yaWVudGF0aW9uLCByYW5kb21TaGlwVHlwZTtcblxuICAgIHJhbmRvbVNoaXBPcmllbk51bSA9PT0gMSA/IHJhbmRvbVNoaXBPcmllbnRhdGlvbiA9IHNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMIDogcmFuZG9tU2hpcE9yaWVudGF0aW9uID0gc2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMO1xuXG4gICAgc3dpdGNoKHJhbmRvbVNoaXBUeXBlTnVtKXtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmFuZG9tU2hpcFR5cGUgPSBzaGlwVHlwZS5DQVJSSUVSO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmFuZG9tU2hpcFR5cGUgPSBzaGlwVHlwZS5CQVRUTEVTSElQO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmFuZG9tU2hpcFR5cGUgPSBzaGlwVHlwZS5DUlVJU0VSO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgcmFuZG9tU2hpcFR5cGUgPSBzaGlwVHlwZS5ERVNUUk9ZRVI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmFibGUgdG8gZ2V0IGEgcmFuZG9tIHNoaXAgdHlwZWApXG4gICAgfVxuXG4gICAgdGhpcy5ib2FyZC5wbGFjZVNoaXBzKHJhbmRvbVNoaXBUeXBlLHJhbmRvbVNoaXBPcmllbnRhdGlvbiwgdGhpcy5yYW5kb21Db29yZGluYXRlKCkpO1xuICB9XG5cbn1cblxuZnVuY3Rpb24gUGxheWVyKG5hbWUpe1xuICBsZXQgcGxheWVyO1xuICBpZihuYW1lKXtcbiAgICBwbGF5ZXIgPSBPYmplY3QuY3JlYXRlKHBsYXllckFjdGlvbnMpO1xuICAgIHBsYXllci5uYW1lID0gbmFtZTtcbiAgfWVsc2V7XG4gICAgcGxheWVyID0gT2JqZWN0LmNyZWF0ZShjcHVBY3Rpb25zKTtcbiAgICBwbGF5ZXIubmFtZSA9IGBDUFVgO1xuICB9XG4gIHBsYXllci5ib2FyZCA9IEdhbWVCb2FyZCgpO1xuICByZXR1cm4gcGxheWVyO1xufVxuXG5cbiIsImV4cG9ydCB7c2hpcFR5cGUsIFNoaXB9XG5cbmNvbnN0IHNoaXBUeXBlID0ge1xuICBDQVJSSUVSOiBTeW1ib2woYGNhcnJpZXJgKSxcbiAgQkFUVExFU0hJUDogU3ltYm9sKGBiYXR0bGVzaGlwYCksXG4gIENSVUlTRVI6IFN5bWJvbChgY3J1aXNlcmApLFxuICBERVNUUk9ZRVI6IFN5bWJvbChgZGVzdHJveWVyYCksXG59XG5cblxuY29uc3Qgc2hpcEFjdGlvbnMgPSB7XG4gIGhpdCgpe1xuICAgIGlmKHRoaXMuaXNTdW5rJiZ0aGlzLmhpdFBvaW50cz50aGlzLmxlbmd0aClcbiAgICAgIHRocm93IG5ldyBFcnJvcihgU2hpcCBzaG91bGQndmUgYmVlbiBkZXN0cm95ZWQgYnkgbm93YCk7XG5cbiAgICArK3RoaXMuaGl0UG9pbnRzO1xuICAgIHRoaXMuY2hlY2tTaGlwU3RhdGUoKTtcbiAgfSxcbiAgY2hlY2tTaGlwU3RhdGUoKXtcbiAgICBpZih0aGlzLmhpdFBvaW50cz09dGhpcy5sZW5ndGgpXG4gICAgICByZXR1cm4gdGhpcy5pc1N1bmsgPSB0cnVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIFNoaXAodHlwZSl7XG5cbiAgY29uc3Qgc2hpcCA9IE9iamVjdC5jcmVhdGUoc2hpcEFjdGlvbnMpOyBcbiAgc2hpcC5oaXRQb2ludHMgPSAwO1xuICBzaGlwLmlzU3VuayA9IGZhbHNlO1xuICBzaGlwLklEID0gdW5kZWZpbmVkO1xuXG4gIHN3aXRjaCh0eXBlKXtcbiAgICBjYXNlKHNoaXBUeXBlLkNBUlJJRVIpOlxuICAgICAgc2hpcC5sZW5ndGggPSA1O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZShzaGlwVHlwZS5CQVRUTEVTSElQKTpcbiAgICAgIHNoaXAubGVuZ3RoID0gNDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2Uoc2hpcFR5cGUuQ1JVSVNFUik6XG4gICAgICBzaGlwLmxlbmd0aCA9IDM7XG4gICAgICBicmVhaztcbiAgICBjYXNlKHNoaXBUeXBlLkRFU1RST1lFUik6XG4gICAgICBzaGlwLmxlbmd0aCA9IDI7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4ndCBjcmVhdGUgc2hpcCB3aXRob3V0IGEgc3BlY2lmaWMgc2hpcCB0eXBlYCk7XG4gIH1cbiAgcmV0dXJuIHNoaXA7XG59XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==