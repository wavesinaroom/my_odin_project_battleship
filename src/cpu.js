import {coordinate, shipOrientation} from './gameboard'
import {shipType} from './ship';
export {randomCoordinate, randomShipType, randomOrientation};

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
