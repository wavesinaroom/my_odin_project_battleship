import Missile from './missile';
import { EventManager } from './eventmanager';
import {coordinate, shipOrientation} from './gameboard'
import {shipType} from './ship';
export {randomCoordinate, randomShipType, randomOrientation, fire, placeRandomShip};

function randomCoordinate(){
  //Come back here if you feel 9 is never throw out
  return coordinate(Math.floor(Math.random()*10),Math.floor(Math.random()*10));
}

function randomShipType(){
  switch(Math.floor((Math.random()*4))){
    case 0:
      return shipType.DESTROYER;
    case 1:
      return shipType.CARRIER;
    case 2:
      return shipType.CRUISER;
    case 3:
      return shipType.BATTLESHIP;
  }
}

function randomOrientation(){
  if(Math.floor(Math.random()*2))
    return shipOrientation.HORIZONTAL;
  return shipOrientation.VERTICAL;
}

function fire(coordinate){
  this.board.missiles.push(Missile(coordinate));
  EventManager.handleAttack(this.name,this.board.missiles[this.board.missiles.length-1]);
  EventManager.hit = false;
}

function placeRandomShip(){
  try{
    this.board.placeShip(randomShipType(),randomOrientation(),randomCoordinate());
  }catch(e){
    this.board.placeShip(randomShipType(),randomOrientation(),randomCoordinate());
  }
}
