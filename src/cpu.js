import Missile from './missile';
import { EventManager } from './eventmanager';
import {coordinate, shipOrientation} from './gameboard'
import {shipType} from './ship';
export {cpu};

const cpu = {

  hits : [],

  checkAxis(existing, incoming){
    if(existing.x-incoming.x === 0 && Math.abs(existing.y-incoming.y)<5)
      return shipOrientation.VERTICAL;
    else if(Math.abs(existing.x-incoming.x)<5 && existing.y-incoming.y === 0)
      return shipOrientation.HORIZONTAL;
    else
      this.hits.push(incoming);
  },

  generateAxis(coord, orientation){
    if(!coord)
      throw new Error(`Coordinates missing`);
    let moves = [];
    if(orientation === shipOrientation.HORIZONTAL){
      for(let i = coord.x-3; i<coord.x+4; ++i){
        try{
          moves.push(Missile(coordinate(i, coord.y))); 
        }catch{
          continue;
        } 
      }
    }else if(orientation === shipOrientation.VERTICAL){
      for(let i = coord.y-3; i<coord.y+4; ++i){
        try{
          moves.push(Missile(coordinate(coord.x, i))); 
        }catch{
          continue;
        } 
      }
    }else{
      throw new Error(`Missing ship orientation`);
    }
    return moves;
  },

  markMoves(moves, coord){
    moves.forEach(move=>{
      if(move.coordinate.x === coord.x && move.coordinate.y === coord.y)
        move.hit = true;
    });
  },

  randomCoordinate(){
    //Come back here if you feel 9 is never thrown out
    return coordinate(Math.floor(Math.random()*10),Math.floor(Math.random()*10));
  },

  randomShipType(){
    switch(Math.floor((Math.random()*4))){
      case 0:
        return shipType.DESTROYER;
      case 1:
        return shipType.CARRIER;
      case 2:
        return shipType.CRUISER;
      case 3:
        return shipType.BATTLESHIP;
    }
  },

  randomOrientation(){
    if(Math.floor(Math.random()*2))
      return shipOrientation.HORIZONTAL;
    return shipOrientation.VERTICAL;
  },

  fire(coordinate){
    this.board.missiles.push(Missile(coordinate));
    EventManager.handleAttack(this.name,this.board.missiles[this.board.missiles.length-1]);
    EventManager.hit = false;
  },

  placeRandomShip(){
    try{
      this.board.placeShip(this.randomShipType(),this.randomOrientation(),this.randomCoordinate());
    }catch(e){
      this.placeRandomShip();
    }
  }
}
