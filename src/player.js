import {coordinate, GameBoard, shipOrientation} from './gameboard';
import { EventManager } from './eventmanager';
import {GameManager} from './gamemanager';
import {shipType} from './ship';
import Missile from './missile';
export {Player}

const playerActions = {
  fire(coordinate){
    this.board.missiles.push(Missile(coordinate));
    EventManager.handleAttack(this.name,this.board.missiles[this.board.missiles.length-1]);
    EventManager.hit = false;
  }
}
/*
const cpuActions = {
  fire(){
    let attackCoord = this.randomCoordinate();
    if(this.board.tiles.includes(attackCoord))
      attackCoord = this.randomCoordinate();

    EventManager.notifyAttack(this.name, attackCoord);
  },

  randomCoordinate(){
    const boardSize = GameManager.cpu.board.size;
    const minTileNum = 1;
    return coordinate(Math.floor(Math.random()*(boardSize-minTileNum)+minTileNum),Math.floor(Math.random()*(boardSize-minTileNum)+minTileNum));
  },

  placeRandomShip(){
    const randomShipOrienNum = Math.floor(Math.random());
    const randomShipTypeNum = Math.floor(Math.random()*3);
    
    let randomShipOrientation, randomShipType;

    randomShipOrienNum === 1 ? randomShipOrientation = shipOrientation.HORIZONTAL : randomShipOrientation = shipOrientation.VERTICAL;

    switch(randomShipTypeNum){
      case 0:
        randomShipType = shipType.CARRIER;
        break;
      case 1:
        randomShipType = shipType.BATTLESHIP;
        break;
      case 2:
        randomShipType = shipType.CRUISER;
        break;
      case 3:
        randomShipType = shipType.DESTROYER;
        break;
      default:
        throw new Error(`Unable to get a random ship type`)
    }

    this.board.placeShips(randomShipType,randomShipOrientation, this.randomCoordinate());
  }

}*/

function Player(name){
  let player;
  if(name){
    player = Object.create(playerActions);
    player.name = name;
  }else{
    player = Object.create(cpuActions);
    player.name = `CPU`;
  }
  player.board = GameBoard();
  return player;
}


