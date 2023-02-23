import {coordinate} from './gameboard'
export {randomCoordinate};

function randomCoordinate(){
  return coordinate(Math.floor(Math.random()*9),Math.floor(Math.random()*9));
}

