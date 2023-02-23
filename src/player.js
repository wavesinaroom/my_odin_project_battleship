import { GameBoard } from './gameboard';
import { EventManager } from './eventmanager';
import Missile from './missile';
import * as cpuActions from './cpu'
export {Player}

const playerActions = {
  fire(coordinate){
    this.board.missiles.push(Missile(coordinate));
    EventManager.handleAttack(this.name,this.board.missiles[this.board.missiles.length-1]);
    EventManager.hit = false;
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


