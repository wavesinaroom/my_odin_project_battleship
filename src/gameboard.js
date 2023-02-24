import {EventManager} from "./eventmanager";
import Missile from "./missile";
import {  Ship } from "./ship"
export {GameBoard, coordinate, shipOrientation}

function coordinate(x,y){
  //Coordinates are zero based, that's why the boardsize-1 shift
  const boardSize = 10;
  if(x > boardSize-1 || x < 0)
    throw new Error(`X coordinate is out of boundaries`);
  if(y > boardSize-1 || y < 0)
    throw new Error(`Y coordinate is out of boundaries`);
  return{x:x, y:y}
}

const shipOrientation = {
  HORIZONTAL: Symbol(`horizontal`),
  VERTICAL: Symbol(`vertical`),
}

const gameBoardActions = {
  checkExistingCoordinates(inputCoordinate, coordinates){
      for(let i = 0; i < coordinates.length; ++i)
        if (coordinates[i].x === inputCoordinate.x && coordinates[i].y === inputCoordinate.y)
          return true;
  },

  checkBoundaries(inputCoordinate, shipLength){
    if(inputCoordinate.x + shipLength > this.size||inputCoordinate.y + shipLength > this.size){
      throw new Error(`Part of ship is out of board boundaries`);
    }
  },

  generateCoordinates(orientation, inputCoordinate, array){
    if(orientation === shipOrientation.HORIZONTAL)
      for(let i = 0; i<array.length; ++i)
        array[i] = coordinate(inputCoordinate.x+i, inputCoordinate.y) ;
    else if(orientation === shipOrientation.VERTICAL)
      for(let i = 0; i<array.length; ++i)
        array[i] = coordinate(inputCoordinate.x, inputCoordinate.y+i) ;
  },

  placeShip(shipType, orientation, inputCoordinate){
    console.count(`placeShip`)
    const ship = Ship(shipType);
    this.ships.forEach(navy=>{
      if(this.checkExistingCoordinates(inputCoordinate, navy.coordinates)){
        throw new Error(`There's already a ship on that coordinate`);
      }
    });

    this.checkBoundaries(inputCoordinate, ship.coordinates.length);
    this.generateCoordinates(orientation, inputCoordinate, ship.coordinates);

    this.ships.push(ship);
  },

  getAttack(inputCoordinate){
    this.ships.forEach(ship=>{
      if(this.checkExistingCoordinates(inputCoordinate, ship.coordinates)){
        ship.hit(inputCoordinate);
        EventManager.hit = true;
      }
    });

    this.checkSunkFleet();
  },

  checkSunkFleet(){
    for(let i = 0; i<this.ships.length; ++i)
      if(!this.ships[i].isSunk)
        return this.sunkFleet = false;
    return this.sunkFleet = true;
  },

}

function GameBoard (){
  const gameboard = Object.create(gameBoardActions);
  gameboard.ships = [];
  gameboard.missiles= []; 
  gameboard.size= 10;
  gameboard.sunkFleet = false;

  return gameboard;
}


