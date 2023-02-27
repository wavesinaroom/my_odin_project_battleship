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
  
  generateTree(input){
    //Takes a coordinate as input value
    const tree = Object.create(shotsTree);
      tree.centre = input; 

    return tree;
  },

  expandTree(tree, input){
    switch (input){
      case coordinate(tree.centre.x,tree.centre.y+1):
        tree.up = this.generateTree(coordinate(input.x,input.y+1));
        break;
      case coordinate(tree.centre.x+1,tree.centre.y):
        tree.right = this.generateTree(coordinate(input.x+1,input.y));
        break;
      case coordinate(tree.centre.x,tree.centre.y-1):
        tree.down = this.generateTree(coordinate(input.x,input.y-1));
        break;
      case coordinate(tree.centre.x-1,tree.centre.y):
        tree.left = this.generateTree(coordinate(input.x-1,input.y));
        break;
    }
  },

  traverseTree(tree){
    if(tree.up)
      this.traverseTree(tree.up);
    else if(tree.right)
      this.traverseTree(tree.right);
    else if(tree.down)
      this.traverseTree(tree.down);
    else if(tree.left)
      this.traverseTree(tree.left);
    return tree;
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
