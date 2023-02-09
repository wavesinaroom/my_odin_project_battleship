import {coordinate, GameBoard} from './gameboard';
import { EventManager } from './eventmanager';
import {GameManager} from './gamemanager';
export {Player}

const playerActions = {
  fire(coordinate){
    EventManager.notifyAttack(this.name, coordinate);
  }
}

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
  player.board = GameBoard();
  return player;
}


