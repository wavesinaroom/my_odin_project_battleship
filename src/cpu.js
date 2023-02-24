import Missile from './missile';
import { EventManager } from './eventmanager';
import {coordinate, shipOrientation} from './gameboard'
import {shipType} from './ship';
export {cpu};

const shotsTree = {
  center: undefined,
  up: undefined,
  right: undefined,
  down: undefined,
  left: undefined
}

const cpu = {

  shotsTrees : [],
  
  generateTree(input){
    //Takes a missile as input value
    const tree = Object.create(shotsTree);
      tree.center = input; 
      tree.up = Missile(coordinate(input.coordinate.x, input.coordinate.y+1));
      tree.right = Missile(coordinate(input.coordinate.x+1,input.coordinate.y));
      tree.down = Missile(coordinate(input.coordinate.x, input.coordinate.y-1));
      tree.left = Missile(coordinate(input.coordinate.x-1, input.coordinate.y));

    return tree;
  },

  randomCoordinate(){
    //Come back here if you feel 9 is never throw out
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
      this.board.placeShip(this.randomShipType(),this.randomOrientation(),this.randomCoordinate());
    }
  }
}
