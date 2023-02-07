import {coordinate, GameBoard} from './gameboard';
import { EventManager } from './eventmanager';
export {Player}

const playerActions = {
  fire(coordinate){
    EventManager.notifyAttack(this.name, coordinate);
  }
}

function Player(name){
  const player = Object.create(playerActions);
  player.board = GameBoard();
  name === undefined ? player.name = `CPU`: player.name = name;
  return player;
}


