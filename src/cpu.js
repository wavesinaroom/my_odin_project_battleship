import Missile from './missile';
import { EventManager } from './eventmanager';
import {coordinate, shipOrientation} from './gameboard'
import {shipType} from './ship';
export {cpu};

const shotsTree = {
  centre: undefined,
  up: undefined,
  right: undefined,
  down: undefined,
  left: undefined
}

const cpu = {

  shotsTrees : [],
  
  generateTree(input, visited){
    //Takes a coordinate as input value
    const tree = Object.create(shotsTree);
      tree.centre = input; 

    if(visited){
      switch(visited.centre){
        case coordinate(tree.centre.coordinate.x,tree.centre.coordinate.y+1):
          tree.up = visited;
          break;
        case coordinate(tree.centre.coordinate.x+1,tree.centre.coordinate.y):
          tree.right = visited;
          break;
        case coordinate(tree.centre.coordinate.x,tree.centre.coordinate.y-1):
          tree.down = visited;
          break;
        case coordinate(tree.centre.coordinate.x-1,tree.centre.coordinate.y):
          tree.left = visited;
          break;
      }
    }

    return tree;
  },

  expandTree(tree, input){
    switch (input){
      case coordinate(tree.centre.coordinate.x,tree.centre.coordinate.y+1):
        tree.up = this.generateTree(coordinate(input.x,input.y+1), tree.centre);
        break;
      case coordinate(tree.centre.coordinate.x+1,tree.centre.coordinate.y):
        tree.right = this.generateTree(coordinate(input.x+1,input.y), tree.centre);
        break;
      case coordinate(tree.centre.coordinate.x,tree.centre.coordinate.y-1):
        tree.down = this.generateTree(coordinate(input.x,input.y-1), tree.centre);
        break;
      case coordinate(tree.centre.coordinate.x-1,tree.centre.coordinate.y):
        tree.left = this.generateTree(coordinate(input.x-1,input.y), tree.centre);
        break;
    }
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
      this.placeRandomShip();
    }
  }
}
