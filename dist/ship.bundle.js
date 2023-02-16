"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["ship"],{

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
/******/ var __webpack_exports__ = (__webpack_exec__("./src/ship.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBdUI7O0FBRXZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQge3NoaXBUeXBlLCBTaGlwfVxuXG5jb25zdCBzaGlwVHlwZSA9IHtcbiAgQ0FSUklFUjogU3ltYm9sKGBjYXJyaWVyYCksXG4gIEJBVFRMRVNISVA6IFN5bWJvbChgYmF0dGxlc2hpcGApLFxuICBDUlVJU0VSOiBTeW1ib2woYGNydWlzZXJgKSxcbiAgREVTVFJPWUVSOiBTeW1ib2woYGRlc3Ryb3llcmApLFxufVxuXG5cbmNvbnN0IHNoaXBBY3Rpb25zID0ge1xuICBoaXQoKXtcbiAgICBpZih0aGlzLmlzU3VuayYmdGhpcy5oaXRQb2ludHM+dGhpcy5sZW5ndGgpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNoaXAgc2hvdWxkJ3ZlIGJlZW4gZGVzdHJveWVkIGJ5IG5vd2ApO1xuXG4gICAgKyt0aGlzLmhpdFBvaW50cztcbiAgICB0aGlzLmNoZWNrU2hpcFN0YXRlKCk7XG4gIH0sXG4gIGNoZWNrU2hpcFN0YXRlKCl7XG4gICAgaWYodGhpcy5oaXRQb2ludHM9PXRoaXMubGVuZ3RoKVxuICAgICAgcmV0dXJuIHRoaXMuaXNTdW5rID0gdHJ1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBTaGlwKHR5cGUpe1xuXG4gIGNvbnN0IHNoaXAgPSBPYmplY3QuY3JlYXRlKHNoaXBBY3Rpb25zKTsgXG4gIHNoaXAuaGl0UG9pbnRzID0gMDtcbiAgc2hpcC5pc1N1bmsgPSBmYWxzZTtcbiAgc2hpcC5JRCA9IHVuZGVmaW5lZDtcblxuICBzd2l0Y2godHlwZSl7XG4gICAgY2FzZShzaGlwVHlwZS5DQVJSSUVSKTpcbiAgICAgIHNoaXAubGVuZ3RoID0gNTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2Uoc2hpcFR5cGUuQkFUVExFU0hJUCk6XG4gICAgICBzaGlwLmxlbmd0aCA9IDQ7XG4gICAgICBicmVhaztcbiAgICBjYXNlKHNoaXBUeXBlLkNSVUlTRVIpOlxuICAgICAgc2hpcC5sZW5ndGggPSAzO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZShzaGlwVHlwZS5ERVNUUk9ZRVIpOlxuICAgICAgc2hpcC5sZW5ndGggPSAyO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FuJ3QgY3JlYXRlIHNoaXAgd2l0aG91dCBhIHNwZWNpZmljIHNoaXAgdHlwZWApO1xuICB9XG4gIHJldHVybiBzaGlwO1xufVxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=