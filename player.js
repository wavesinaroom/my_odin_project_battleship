import {coordinate, GameBoard} from './gameboard';
import { EventManager } from './eventmanager';
export {Player}

const playerActions = {
  fire(coordinate){
    EventManager.notifyAttack(this.name, coordinate);
  }
}

const cpuActions = {
  fire(coordinate){
    EventManager.notifyAttack(this.name, coordinate);
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


