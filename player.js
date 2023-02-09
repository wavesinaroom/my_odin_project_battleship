import {coordinate, GameBoard} from './gameboard';
import { EventManager } from './eventmanager';
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
    return coordinate(Math.floor(Math.random()*(10-1)+1),Math.floor(Math.random()*(10-1)+1));
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


