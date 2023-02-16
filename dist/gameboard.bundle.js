"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["gameboard"],{

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
/******/ var __webpack_exports__ = (__webpack_exec__("./src/gameboard.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZWJvYXJkLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUE4QjtBQUN1Qjs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsMkNBQUk7QUFDckIsaUJBQWlCLGtCQUFrQixHQUFHLGtCQUFrQjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGVBQWU7QUFDcEMsb0ZBQW9GLFFBQVE7QUFDNUYsS0FBSztBQUNMO0FBQ0E7QUFDQSxxQkFBcUIsZUFBZTtBQUNwQyxvRkFBb0YsUUFBUTtBQUM1RixLQUFLO0FBQ0w7O0FBRUEseUJBQXlCLFFBQVE7QUFDakMsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsbUJBQW1CLHFCQUFxQjtBQUN4QztBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4RnVCOztBQUV2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgIFNoaXAgfSBmcm9tIFwiLi9zaGlwXCJcbmV4cG9ydCB7R2FtZUJvYXJkLCBjb29yZGluYXRlLCBzaGlwT3JpZW50YXRpb24sIHRpbGV9XG5cbmZ1bmN0aW9uIGNvb3JkaW5hdGUoeCx5KXtcbiAgY29uc3QgYm9hcmRTaXplID0gMTA7XG4gIGlmKHggPiBib2FyZFNpemUgfHwgeCA8IDEpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBYIGNvb3JkaW5hdGUgaXMgb3V0IG9mIGJvdW5kYXJpZXNgKTtcbiAgaWYoeSA+IGJvYXJkU2l6ZSB8fCB5IDwgMSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFkgY29vcmRpbmF0ZSBpcyBvdXQgb2YgYm91bmRhcmllc2ApO1xuICByZXR1cm57eDp4LCB5Onl9XG59XG5cbmZ1bmN0aW9uIHRpbGUoY29vcmRpbmF0ZSwgaWQpe1xuICByZXR1cm57Y29vcmRpbmF0ZTogY29vcmRpbmF0ZSwgaWQ6IGlkfVxufVxuXG5jb25zdCBzaGlwT3JpZW50YXRpb24gPSB7XG4gIEhPUklaT05UQUw6IFN5bWJvbChgaG9yaXpvbnRhbGApLFxuICBWRVJUSUNBTDogU3ltYm9sKGB2ZXJ0aWNhbGApLFxufVxuXG5jb25zdCBnYW1lYm9hcmRBY3Rpb25zID0ge1xuICBwbGFjZVNoaXBzKHNoaXBUeXBlLCBvcmllbnRhdGlvbiwgaW5wdXRDb29yZGluYXRlKXtcbiAgICBjb25zdCBzaGlwID0gU2hpcChzaGlwVHlwZSk7XG4gICAgc2hpcC5JRCA9IGAke2lucHV0Q29vcmRpbmF0ZS54fSwke2lucHV0Q29vcmRpbmF0ZS55fWA7XG4gIFxuICAgIHRoaXMudGlsZXMuZm9yRWFjaCh0aWxlPT57XG4gICAgICBpZih0aWxlLmNvb3JkaW5hdGUueCA9PT0gaW5wdXRDb29yZGluYXRlLnggJiYgdGlsZS5jb29yZGluYXRlLnkgPT09IGlucHV0Q29vcmRpbmF0ZS55KVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGVyZSdzIGFscmVhZHkgYW4gb2JqZWN0IG9uIHRoYXQgaW5wdXQgY29vcmRpbmF0ZWApO1xuICAgIH0pXG5cbiAgICBpZihvcmllbnRhdGlvbiA9PT0gc2hpcE9yaWVudGF0aW9uLkhPUklaT05UQUwpe1xuICAgICAgaWYoaW5wdXRDb29yZGluYXRlLnggKyBzaGlwLmxlbmd0aCA+IHRoaXMuc2l6ZSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBQYXJ0IG9mIHNoaXAgaXMgb3V0IG9mIGJvYXJkIFggYm91bmRhcnlgKTtcbiAgICAgIGZvcihsZXQgaSA9IDA7IGk8c2hpcC5sZW5ndGg7ICsraSlcbiAgICAgICAgdGhpcy50aWxlcy5wdXNoKHRpbGUoY29vcmRpbmF0ZShpbnB1dENvb3JkaW5hdGUueCtpLCBpbnB1dENvb3JkaW5hdGUueSksIGAke3NoaXAuSUR9YCkpO1xuICAgIH1lbHNlIGlmKG9yaWVudGF0aW9uID09PSBzaGlwT3JpZW50YXRpb24uVkVSVElDQUwpe1xuICAgICAgaWYoaW5wdXRDb29yZGluYXRlLnkgKyBzaGlwLmxlbmd0aCA+IHRoaXMuc2l6ZSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBQYXJ0IG9mIHNoaXAgaXMgb3V0IG9mIGJvYXJkIFkgYm91bmRhcnlgKTtcbiAgICAgIGZvcihsZXQgaSA9IDA7IGk8c2hpcC5sZW5ndGg7ICsraSlcbiAgICAgICAgdGhpcy50aWxlcy5wdXNoKHRpbGUoY29vcmRpbmF0ZShpbnB1dENvb3JkaW5hdGUueCwgaW5wdXRDb29yZGluYXRlLnkraSksIGAke3NoaXAuSUR9YCkpO1xuICAgIH1lbHNlXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZGVmaW5lZCBzaGlwIG9yaWVudGF0aW9uYCk7XG5cbiAgICB0aGlzLnNoaXBzTG9nLnNldChgJHtzaGlwLklEfWAsc2hpcCk7XG4gIH0sXG5cbiAgZ2V0QXR0YWNrKGlucHV0Q29vcmRpbmF0ZSl7XG4gICAgbGV0IGlzU2hpcCwgSUQ7XG4gICAgdGhpcy50aWxlcy5mb3JFYWNoKHRpbGU9PntcbiAgICAgIGlmKHRpbGUuY29vcmRpbmF0ZS55PT09aW5wdXRDb29yZGluYXRlLnkmJnRpbGUuY29vcmRpbmF0ZS54PT09aW5wdXRDb29yZGluYXRlLngmJnRpbGUuaWQpe1xuICAgICAgICBJRCA9IHRpbGUuaWQ7XG4gICAgICAgIHJldHVybiBpc1NoaXAgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pXG5cbiAgICBpZihpc1NoaXApe1xuICAgICAgdGhpcy5zaGlwc0xvZy5nZXQoSUQpLmhpdCgpXG4gICAgICBpZih0aGlzLnNoaXBzTG9nLmdldChJRCkuaXNTdW5rKXtcbiAgICAgICAgdGhpcy5yZW1vdmVTaGlwKElEKTtcbiAgICAgICAgdGhpcy5jaGVja1N1bmtGbGVldCgpO1xuICAgICAgfVxuICAgIH1lbHNlXG4gICAgICB0aGlzLnRpbGVzLnB1c2godGlsZShpbnB1dENvb3JkaW5hdGUsIHVuZGVmaW5lZCkpO1xuICB9LFxuXG4gIHJlbW92ZVNoaXAoSUQpe1xuICAgIHRoaXMuc2hpcHNMb2cuZGVsZXRlKElEKTtcbiAgICBmb3IobGV0IGkgPSAwOyBpPHRoaXMudGlsZXMubGVuZ3RoOyArK2kpXG4gICAgICBpZih0aGlzLnRpbGVzW2ldLmlkPT09SUQpXG4gICAgICAgIHRoaXMudGlsZXMuc3BsaWNlKGksMSk7XG4gIH0sXG5cbiAgY2hlY2tTdW5rRmxlZXQoKXtcbiAgICB0aGlzLnNoaXBzTG9nLnNpemUgPT09IDAgPyB0aGlzLnN1bmtGbGVldD10cnVlOnRoaXMuc3Vua0ZsZWV0PWZhbHNlO1xuICB9XG5cbn1cblxuXG5mdW5jdGlvbiBHYW1lQm9hcmQgKCl7XG4gIGNvbnN0IGdhbWVib2FyZCA9IE9iamVjdC5jcmVhdGUoZ2FtZWJvYXJkQWN0aW9ucyk7XG4gIGdhbWVib2FyZC5zaGlwc0xvZyA9IG5ldyBNYXAoKTtcbiAgZ2FtZWJvYXJkLnRpbGVzPSBbXTsgXG4gIGdhbWVib2FyZC5zaXplPSAxMDtcbiAgZ2FtZWJvYXJkLnN1bmtGbGVldCA9IGZhbHNlO1xuXG4gICAgcmV0dXJuIGdhbWVib2FyZDtcbn1cblxuXG4iLCJleHBvcnQge3NoaXBUeXBlLCBTaGlwfVxuXG5jb25zdCBzaGlwVHlwZSA9IHtcbiAgQ0FSUklFUjogU3ltYm9sKGBjYXJyaWVyYCksXG4gIEJBVFRMRVNISVA6IFN5bWJvbChgYmF0dGxlc2hpcGApLFxuICBDUlVJU0VSOiBTeW1ib2woYGNydWlzZXJgKSxcbiAgREVTVFJPWUVSOiBTeW1ib2woYGRlc3Ryb3llcmApLFxufVxuXG5cbmNvbnN0IHNoaXBBY3Rpb25zID0ge1xuICBoaXQoKXtcbiAgICBpZih0aGlzLmlzU3VuayYmdGhpcy5oaXRQb2ludHM+dGhpcy5sZW5ndGgpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNoaXAgc2hvdWxkJ3ZlIGJlZW4gZGVzdHJveWVkIGJ5IG5vd2ApO1xuXG4gICAgKyt0aGlzLmhpdFBvaW50cztcbiAgICB0aGlzLmNoZWNrU2hpcFN0YXRlKCk7XG4gIH0sXG4gIGNoZWNrU2hpcFN0YXRlKCl7XG4gICAgaWYodGhpcy5oaXRQb2ludHM9PXRoaXMubGVuZ3RoKVxuICAgICAgcmV0dXJuIHRoaXMuaXNTdW5rID0gdHJ1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBTaGlwKHR5cGUpe1xuXG4gIGNvbnN0IHNoaXAgPSBPYmplY3QuY3JlYXRlKHNoaXBBY3Rpb25zKTsgXG4gIHNoaXAuaGl0UG9pbnRzID0gMDtcbiAgc2hpcC5pc1N1bmsgPSBmYWxzZTtcbiAgc2hpcC5JRCA9IHVuZGVmaW5lZDtcblxuICBzd2l0Y2godHlwZSl7XG4gICAgY2FzZShzaGlwVHlwZS5DQVJSSUVSKTpcbiAgICAgIHNoaXAubGVuZ3RoID0gNTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2Uoc2hpcFR5cGUuQkFUVExFU0hJUCk6XG4gICAgICBzaGlwLmxlbmd0aCA9IDQ7XG4gICAgICBicmVhaztcbiAgICBjYXNlKHNoaXBUeXBlLkNSVUlTRVIpOlxuICAgICAgc2hpcC5sZW5ndGggPSAzO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZShzaGlwVHlwZS5ERVNUUk9ZRVIpOlxuICAgICAgc2hpcC5sZW5ndGggPSAyO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FuJ3QgY3JlYXRlIHNoaXAgd2l0aG91dCBhIHNwZWNpZmljIHNoaXAgdHlwZWApO1xuICB9XG4gIHJldHVybiBzaGlwO1xufVxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=