import {coordinate, GameBoard} from './gameboard';
import { EventManager } from './eventmanager';
export {Player}

const playerLabels = {
  PLAYER: Symbol(`player`), 
  CPU: Symbol(`cpu`)
}

const playerActions = {
  eventManager: EventManager,
  fire(coordinate){
    this.eventManager.notifyAttack(this.playerLabel, coordinate);
  }
}

function Player(name, playerLabel){
  const player = Object.create(playerActions);
  player.name = name;
  player.board = GameBoard();
  player.label = playerLabel;
  return player;
}
