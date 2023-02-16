"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["gamemanager"],{

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
/******/ var __webpack_exports__ = (__webpack_exec__("./src/gamemanager.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZW1hbmFnZXIuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQXlDO0FBQ3BCOztBQUVyQjtBQUNBLGVBQWUscURBQVc7QUFDMUI7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLDBEQUFnQjtBQUNsQztBQUNBO0FBQ0Esc0JBQXNCLDRFQUFrQyxhQUFhLHlFQUErQjtBQUNwRyxJQUFJLGdFQUFzQjtBQUMxQjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZDhCO0FBQ3VCOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQiwyQ0FBSTtBQUNyQixpQkFBaUIsa0JBQWtCLEdBQUcsa0JBQWtCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsZUFBZTtBQUNwQyxvRkFBb0YsUUFBUTtBQUM1RixLQUFLO0FBQ0w7QUFDQTtBQUNBLHFCQUFxQixlQUFlO0FBQ3BDLG9GQUFvRixRQUFRO0FBQzVGLEtBQUs7QUFDTDs7QUFFQSx5QkFBeUIsUUFBUTtBQUNqQyxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxtQkFBbUIscUJBQXFCO0FBQ3hDO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hGZ0M7QUFDWjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiwrQ0FBTTtBQUN4QjtBQUNBLGVBQWUsK0NBQU07QUFDckIsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0JtRTtBQUNyQjtBQUNKO0FBQ1Y7QUFDakI7O0FBRWY7QUFDQTtBQUNBLElBQUksb0VBQXlCO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLG9FQUF5QjtBQUM3QixHQUFHOztBQUVIO0FBQ0Esc0JBQXNCLG9FQUEwQjtBQUNoRDtBQUNBLFdBQVcsc0RBQVU7QUFDckIsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVEQUF1RCxrRUFBMEIsMkJBQTJCLGdFQUF3Qjs7QUFFcEk7QUFDQTtBQUNBLHlCQUF5QixtREFBZ0I7QUFDekM7QUFDQTtBQUNBLHlCQUF5QixzREFBbUI7QUFDNUM7QUFDQTtBQUNBLHlCQUF5QixtREFBZ0I7QUFDekM7QUFDQTtBQUNBLHlCQUF5QixxREFBa0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixxREFBUztBQUMxQjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwRXVCOztBQUV2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2V2ZW50bWFuYWdlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVtYW5hZ2VyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0dhbWVNYW5hZ2VyfSBmcm9tICcuL2dhbWVtYW5hZ2VyJ1xuZXhwb3J0IHtFdmVudE1hbmFnZXJ9XG5cbmNvbnN0IEV2ZW50TWFuYWdlciA9IHtcbiAgZ2FtZU1hbmFnZXI6IEdhbWVNYW5hZ2VyLFxuICBub3RpZnlBdHRhY2sod2hvLCBjb29yZGluYXRlKXtcbiAgICBpZighd2hvKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHBsYXllcmApO1xuICAgIGVsc2UgaWYod2hvIT09R2FtZU1hbmFnZXIudHVybilcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB0dXJuYCk7XG4gICAgZWxzZVxuICAgICAgd2hvID09PSBgQ1BVYCA/IEdhbWVNYW5hZ2VyLnBsYXllci5ib2FyZC5nZXRBdHRhY2soY29vcmRpbmF0ZSk6R2FtZU1hbmFnZXIuY3B1LmJvYXJkLmdldEF0dGFjayhjb29yZGluYXRlKTtcbiAgICBHYW1lTWFuYWdlci5jaGFuZ2VUdXJuKHdobyk7XG4gIH1cbn1cbiIsImltcG9ydCB7ICBTaGlwIH0gZnJvbSBcIi4vc2hpcFwiXG5leHBvcnQge0dhbWVCb2FyZCwgY29vcmRpbmF0ZSwgc2hpcE9yaWVudGF0aW9uLCB0aWxlfVxuXG5mdW5jdGlvbiBjb29yZGluYXRlKHgseSl7XG4gIGNvbnN0IGJvYXJkU2l6ZSA9IDEwO1xuICBpZih4ID4gYm9hcmRTaXplIHx8IHggPCAxKVxuICAgIHRocm93IG5ldyBFcnJvcihgWCBjb29yZGluYXRlIGlzIG91dCBvZiBib3VuZGFyaWVzYCk7XG4gIGlmKHkgPiBib2FyZFNpemUgfHwgeSA8IDEpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBZIGNvb3JkaW5hdGUgaXMgb3V0IG9mIGJvdW5kYXJpZXNgKTtcbiAgcmV0dXJue3g6eCwgeTp5fVxufVxuXG5mdW5jdGlvbiB0aWxlKGNvb3JkaW5hdGUsIGlkKXtcbiAgcmV0dXJue2Nvb3JkaW5hdGU6IGNvb3JkaW5hdGUsIGlkOiBpZH1cbn1cblxuY29uc3Qgc2hpcE9yaWVudGF0aW9uID0ge1xuICBIT1JJWk9OVEFMOiBTeW1ib2woYGhvcml6b250YWxgKSxcbiAgVkVSVElDQUw6IFN5bWJvbChgdmVydGljYWxgKSxcbn1cblxuY29uc3QgZ2FtZWJvYXJkQWN0aW9ucyA9IHtcbiAgcGxhY2VTaGlwcyhzaGlwVHlwZSwgb3JpZW50YXRpb24sIGlucHV0Q29vcmRpbmF0ZSl7XG4gICAgY29uc3Qgc2hpcCA9IFNoaXAoc2hpcFR5cGUpO1xuICAgIHNoaXAuSUQgPSBgJHtpbnB1dENvb3JkaW5hdGUueH0sJHtpbnB1dENvb3JkaW5hdGUueX1gO1xuICBcbiAgICB0aGlzLnRpbGVzLmZvckVhY2godGlsZT0+e1xuICAgICAgaWYodGlsZS5jb29yZGluYXRlLnggPT09IGlucHV0Q29vcmRpbmF0ZS54ICYmIHRpbGUuY29vcmRpbmF0ZS55ID09PSBpbnB1dENvb3JkaW5hdGUueSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlcmUncyBhbHJlYWR5IGFuIG9iamVjdCBvbiB0aGF0IGlucHV0IGNvb3JkaW5hdGVgKTtcbiAgICB9KVxuXG4gICAgaWYob3JpZW50YXRpb24gPT09IHNoaXBPcmllbnRhdGlvbi5IT1JJWk9OVEFMKXtcbiAgICAgIGlmKGlucHV0Q29vcmRpbmF0ZS54ICsgc2hpcC5sZW5ndGggPiB0aGlzLnNpemUpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgUGFydCBvZiBzaGlwIGlzIG91dCBvZiBib2FyZCBYIGJvdW5kYXJ5YCk7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpPHNoaXAubGVuZ3RoOyArK2kpXG4gICAgICAgIHRoaXMudGlsZXMucHVzaCh0aWxlKGNvb3JkaW5hdGUoaW5wdXRDb29yZGluYXRlLngraSwgaW5wdXRDb29yZGluYXRlLnkpLCBgJHtzaGlwLklEfWApKTtcbiAgICB9ZWxzZSBpZihvcmllbnRhdGlvbiA9PT0gc2hpcE9yaWVudGF0aW9uLlZFUlRJQ0FMKXtcbiAgICAgIGlmKGlucHV0Q29vcmRpbmF0ZS55ICsgc2hpcC5sZW5ndGggPiB0aGlzLnNpemUpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgUGFydCBvZiBzaGlwIGlzIG91dCBvZiBib2FyZCBZIGJvdW5kYXJ5YCk7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpPHNoaXAubGVuZ3RoOyArK2kpXG4gICAgICAgIHRoaXMudGlsZXMucHVzaCh0aWxlKGNvb3JkaW5hdGUoaW5wdXRDb29yZGluYXRlLngsIGlucHV0Q29vcmRpbmF0ZS55K2kpLCBgJHtzaGlwLklEfWApKTtcbiAgICB9ZWxzZVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmRlZmluZWQgc2hpcCBvcmllbnRhdGlvbmApO1xuXG4gICAgdGhpcy5zaGlwc0xvZy5zZXQoYCR7c2hpcC5JRH1gLHNoaXApO1xuICB9LFxuXG4gIGdldEF0dGFjayhpbnB1dENvb3JkaW5hdGUpe1xuICAgIGxldCBpc1NoaXAsIElEO1xuICAgIHRoaXMudGlsZXMuZm9yRWFjaCh0aWxlPT57XG4gICAgICBpZih0aWxlLmNvb3JkaW5hdGUueT09PWlucHV0Q29vcmRpbmF0ZS55JiZ0aWxlLmNvb3JkaW5hdGUueD09PWlucHV0Q29vcmRpbmF0ZS54JiZ0aWxlLmlkKXtcbiAgICAgICAgSUQgPSB0aWxlLmlkO1xuICAgICAgICByZXR1cm4gaXNTaGlwID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYoaXNTaGlwKXtcbiAgICAgIHRoaXMuc2hpcHNMb2cuZ2V0KElEKS5oaXQoKVxuICAgICAgaWYodGhpcy5zaGlwc0xvZy5nZXQoSUQpLmlzU3Vuayl7XG4gICAgICAgIHRoaXMucmVtb3ZlU2hpcChJRCk7XG4gICAgICAgIHRoaXMuY2hlY2tTdW5rRmxlZXQoKTtcbiAgICAgIH1cbiAgICB9ZWxzZVxuICAgICAgdGhpcy50aWxlcy5wdXNoKHRpbGUoaW5wdXRDb29yZGluYXRlLCB1bmRlZmluZWQpKTtcbiAgfSxcblxuICByZW1vdmVTaGlwKElEKXtcbiAgICB0aGlzLnNoaXBzTG9nLmRlbGV0ZShJRCk7XG4gICAgZm9yKGxldCBpID0gMDsgaTx0aGlzLnRpbGVzLmxlbmd0aDsgKytpKVxuICAgICAgaWYodGhpcy50aWxlc1tpXS5pZD09PUlEKVxuICAgICAgICB0aGlzLnRpbGVzLnNwbGljZShpLDEpO1xuICB9LFxuXG4gIGNoZWNrU3Vua0ZsZWV0KCl7XG4gICAgdGhpcy5zaGlwc0xvZy5zaXplID09PSAwID8gdGhpcy5zdW5rRmxlZXQ9dHJ1ZTp0aGlzLnN1bmtGbGVldD1mYWxzZTtcbiAgfVxuXG59XG5cblxuZnVuY3Rpb24gR2FtZUJvYXJkICgpe1xuICBjb25zdCBnYW1lYm9hcmQgPSBPYmplY3QuY3JlYXRlKGdhbWVib2FyZEFjdGlvbnMpO1xuICBnYW1lYm9hcmQuc2hpcHNMb2cgPSBuZXcgTWFwKCk7XG4gIGdhbWVib2FyZC50aWxlcz0gW107IFxuICBnYW1lYm9hcmQuc2l6ZT0gMTA7XG4gIGdhbWVib2FyZC5zdW5rRmxlZXQgPSBmYWxzZTtcblxuICAgIHJldHVybiBnYW1lYm9hcmQ7XG59XG5cblxuIiwiaW1wb3J0IHtQbGF5ZXJ9IGZyb20gXCIuL3BsYXllclwiOyBcbmV4cG9ydCB7R2FtZU1hbmFnZXJ9XG5cbmNvbnN0IEdhbWVNYW5hZ2VyID0ge1xuICB0dXJuOiB1bmRlZmluZWQsXG4gIHBsYXllcjogdW5kZWZpbmVkLFxuICBjcHU6IHVuZGVmaW5lZCxcbiAgXG4gIHNldFVwR2FtZShuYW1lKXtcbiAgICBpZighbmFtZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUGxheWVyIG5lZWRzIGEgbmFtZWApO1xuICAgIHRoaXMucGxheWVyID0gUGxheWVyKG5hbWUpO1xuICAgIHRoaXMudHVybiA9IHRoaXMucGxheWVyLm5hbWU7XG4gICAgdGhpcy5jcHUgPSBQbGF5ZXIoKTtcbiAgfSxcblxuICBjaGFuZ2VUdXJuKHdobyl7XG4gICAgaWYodGhpcy5wbGF5ZXIuYm9hcmQuc3Vua0ZsZWV0fHx0aGlzLmNwdS5ib2FyZC5zdW5rRmxlZXQpXG4gICAgICB0aGlzLmdhbWVPdmVyKCk7XG4gICAgZWxzZVxuICAgICAgd2hvID09PSB0aGlzLmNwdS5uYW1lPyB0aGlzLnR1cm4gPSB0aGlzLnBsYXllci5uYW1lIDogdGhpcy50dXJuID0gdGhpcy5jcHUubmFtZTtcblxuICAgIGlmKHRoaXMudHVybiA9PT0gYENQVWApXG4gICAgICB0aGlzLmNwdS5maXJlKCk7XG4gIH0sXG5cbiAgZ2FtZU92ZXIoKXtcbiAgICB0aGlzLnBsYXllciA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmNwdSA9IHVuZGVmaW5lZDtcbiAgfVxuXG59XG4iLCJpbXBvcnQge2Nvb3JkaW5hdGUsIEdhbWVCb2FyZCwgc2hpcE9yaWVudGF0aW9ufSBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgeyBFdmVudE1hbmFnZXIgfSBmcm9tICcuL2V2ZW50bWFuYWdlcic7XG5pbXBvcnQge0dhbWVNYW5hZ2VyfSBmcm9tICcuL2dhbWVtYW5hZ2VyJztcbmltcG9ydCB7c2hpcFR5cGV9IGZyb20gJy4vc2hpcCc7XG5leHBvcnQge1BsYXllcn1cblxuY29uc3QgcGxheWVyQWN0aW9ucyA9IHtcbiAgZmlyZShjb29yZGluYXRlKXtcbiAgICBFdmVudE1hbmFnZXIubm90aWZ5QXR0YWNrKHRoaXMubmFtZSwgY29vcmRpbmF0ZSk7XG4gIH1cbn1cblxuY29uc3QgY3B1QWN0aW9ucyA9IHtcbiAgZmlyZSgpe1xuICAgIGxldCBhdHRhY2tDb29yZCA9IHRoaXMucmFuZG9tQ29vcmRpbmF0ZSgpO1xuICAgIGlmKHRoaXMuYm9hcmQudGlsZXMuaW5jbHVkZXMoYXR0YWNrQ29vcmQpKVxuICAgICAgYXR0YWNrQ29vcmQgPSB0aGlzLnJhbmRvbUNvb3JkaW5hdGUoKTtcblxuICAgIEV2ZW50TWFuYWdlci5ub3RpZnlBdHRhY2sodGhpcy5uYW1lLCBhdHRhY2tDb29yZCk7XG4gIH0sXG5cbiAgcmFuZG9tQ29vcmRpbmF0ZSgpe1xuICAgIGNvbnN0IGJvYXJkU2l6ZSA9IEdhbWVNYW5hZ2VyLmNwdS5ib2FyZC5zaXplO1xuICAgIGNvbnN0IG1pblRpbGVOdW0gPSAxO1xuICAgIHJldHVybiBjb29yZGluYXRlKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSooYm9hcmRTaXplLW1pblRpbGVOdW0pK21pblRpbGVOdW0pLE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSooYm9hcmRTaXplLW1pblRpbGVOdW0pK21pblRpbGVOdW0pKTtcbiAgfSxcblxuICBwbGFjZVJhbmRvbVNoaXAoKXtcbiAgICBjb25zdCByYW5kb21TaGlwT3JpZW5OdW0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkpO1xuICAgIGNvbnN0IHJhbmRvbVNoaXBUeXBlTnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjMpO1xuICAgIFxuICAgIGxldCByYW5kb21TaGlwT3JpZW50YXRpb24sIHJhbmRvbVNoaXBUeXBlO1xuXG4gICAgcmFuZG9tU2hpcE9yaWVuTnVtID09PSAxID8gcmFuZG9tU2hpcE9yaWVudGF0aW9uID0gc2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwgOiByYW5kb21TaGlwT3JpZW50YXRpb24gPSBzaGlwT3JpZW50YXRpb24uVkVSVElDQUw7XG5cbiAgICBzd2l0Y2gocmFuZG9tU2hpcFR5cGVOdW0pe1xuICAgICAgY2FzZSAwOlxuICAgICAgICByYW5kb21TaGlwVHlwZSA9IHNoaXBUeXBlLkNBUlJJRVI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxOlxuICAgICAgICByYW5kb21TaGlwVHlwZSA9IHNoaXBUeXBlLkJBVFRMRVNISVA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByYW5kb21TaGlwVHlwZSA9IHNoaXBUeXBlLkNSVUlTRVI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICByYW5kb21TaGlwVHlwZSA9IHNoaXBUeXBlLkRFU1RST1lFUjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuYWJsZSB0byBnZXQgYSByYW5kb20gc2hpcCB0eXBlYClcbiAgICB9XG5cbiAgICB0aGlzLmJvYXJkLnBsYWNlU2hpcHMocmFuZG9tU2hpcFR5cGUscmFuZG9tU2hpcE9yaWVudGF0aW9uLCB0aGlzLnJhbmRvbUNvb3JkaW5hdGUoKSk7XG4gIH1cblxufVxuXG5mdW5jdGlvbiBQbGF5ZXIobmFtZSl7XG4gIGxldCBwbGF5ZXI7XG4gIGlmKG5hbWUpe1xuICAgIHBsYXllciA9IE9iamVjdC5jcmVhdGUocGxheWVyQWN0aW9ucyk7XG4gICAgcGxheWVyLm5hbWUgPSBuYW1lO1xuICB9ZWxzZXtcbiAgICBwbGF5ZXIgPSBPYmplY3QuY3JlYXRlKGNwdUFjdGlvbnMpO1xuICAgIHBsYXllci5uYW1lID0gYENQVWA7XG4gIH1cbiAgcGxheWVyLmJvYXJkID0gR2FtZUJvYXJkKCk7XG4gIHJldHVybiBwbGF5ZXI7XG59XG5cblxuIiwiZXhwb3J0IHtzaGlwVHlwZSwgU2hpcH1cblxuY29uc3Qgc2hpcFR5cGUgPSB7XG4gIENBUlJJRVI6IFN5bWJvbChgY2FycmllcmApLFxuICBCQVRUTEVTSElQOiBTeW1ib2woYGJhdHRsZXNoaXBgKSxcbiAgQ1JVSVNFUjogU3ltYm9sKGBjcnVpc2VyYCksXG4gIERFU1RST1lFUjogU3ltYm9sKGBkZXN0cm95ZXJgKSxcbn1cblxuXG5jb25zdCBzaGlwQWN0aW9ucyA9IHtcbiAgaGl0KCl7XG4gICAgaWYodGhpcy5pc1N1bmsmJnRoaXMuaGl0UG9pbnRzPnRoaXMubGVuZ3RoKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTaGlwIHNob3VsZCd2ZSBiZWVuIGRlc3Ryb3llZCBieSBub3dgKTtcblxuICAgICsrdGhpcy5oaXRQb2ludHM7XG4gICAgdGhpcy5jaGVja1NoaXBTdGF0ZSgpO1xuICB9LFxuICBjaGVja1NoaXBTdGF0ZSgpe1xuICAgIGlmKHRoaXMuaGl0UG9pbnRzPT10aGlzLmxlbmd0aClcbiAgICAgIHJldHVybiB0aGlzLmlzU3VuayA9IHRydWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gU2hpcCh0eXBlKXtcblxuICBjb25zdCBzaGlwID0gT2JqZWN0LmNyZWF0ZShzaGlwQWN0aW9ucyk7IFxuICBzaGlwLmhpdFBvaW50cyA9IDA7XG4gIHNoaXAuaXNTdW5rID0gZmFsc2U7XG4gIHNoaXAuSUQgPSB1bmRlZmluZWQ7XG5cbiAgc3dpdGNoKHR5cGUpe1xuICAgIGNhc2Uoc2hpcFR5cGUuQ0FSUklFUik6XG4gICAgICBzaGlwLmxlbmd0aCA9IDU7XG4gICAgICBicmVhaztcbiAgICBjYXNlKHNoaXBUeXBlLkJBVFRMRVNISVApOlxuICAgICAgc2hpcC5sZW5ndGggPSA0O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZShzaGlwVHlwZS5DUlVJU0VSKTpcbiAgICAgIHNoaXAubGVuZ3RoID0gMztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2Uoc2hpcFR5cGUuREVTVFJPWUVSKTpcbiAgICAgIHNoaXAubGVuZ3RoID0gMjtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbid0IGNyZWF0ZSBzaGlwIHdpdGhvdXQgYSBzcGVjaWZpYyBzaGlwIHR5cGVgKTtcbiAgfVxuICByZXR1cm4gc2hpcDtcbn1cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9