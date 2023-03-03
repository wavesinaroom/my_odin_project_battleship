import { coordinate, GameBoard } from './gameboard';
import { EventManager } from './eventmanager';
import Missile from './missile';
import {cpu} from './cpu'
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
    player = Object.create(playerActions);
    player.name = `CPU`;
    player.ai  = Object.create(cpu);
    player.fireRandomShot = function(latestShot){
      if(this.ai.hits.length){
        this.ai.hits.push([latestShot]);
        this.fire(coordinate(Math.floor(Math.random()*10)),Math.floor(Math.random()*10));
        return;
      }
    }
    player.placeRandomShip = function(){
      try{
        this.board.placeShip(this.ai.randomShipType(),this.ai.randomOrientation(), this.ai.randomCoordinate());
      }catch(e){
        this.placeRandomShip();
      }
    }
  }
  player.board = GameBoard();
  return player;
}


