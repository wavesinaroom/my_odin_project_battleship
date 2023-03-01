import Missile from './missile';
import { EventManager } from './eventmanager';
import {coordinate, shipOrientation} from './gameboard'
import {shipType} from './ship';
export {cpu};

const cpu = {

  hits : [],

  getMoves(existing, incoming){
    let orientation, first, distance, start, moves;

    if(existing.x-incoming.x === 0)
      orientation = shipOrientation.VERTICAL;
    else if(existing.y-incoming.y === 0)
      orientation = shipOrientation.HORIZONTAL;
    else
      this.hits.push(incoming);

    if(orientation === shipOrientation.VERTICAL){
      first =  existing.y > incoming.y ? existing : incoming;
      distance = Math.abs(existing.y-incoming.y);
      start = first.y;
    }else{
      first = existing.x > incoming.x ? existing : incoming;
      distance = Math.abs((existing.x-incoming.x));
      start = first.x;
    }

    for(let i = (2-distance+start); i<6-distance; ++i){
      try{
        if(orientation === shipOrientation.VERTICAL)
          moves.push(Missile(coordinate(first.coordinate.x, start+i)));
        else
          moves.push(Missile(coordinate(start+i, first.coordinate.y))); 
      }catch{
        continue;
      } 
    }

    moves.forEach(move=>{
      if(move.coordinate.x === existing.x && move.coordinate.y === existing.y)
        move.hit = true;
      if(move.coordinate.x === incoming.x && move.coordinate.y === incoming.y)
        move.hit = true;
    });
    return moves;
  },

  randomCoordinate(){
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
