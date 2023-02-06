import {coordinate, GameBoard} from './gameboard';
import { EventManager } from './eventmanager';
export {Player}

const playerLabels = {
  PLAYER: Symbol(`player`), 
  CPU: Symbol(`cpu`)
}

function Player(name, playerLabel){
  const eventManager = EventManager; 
  fire = (playerLabels, coordinate);
  return{name:name, board: GameBoard(), playerLabel:playerLabel}
}
