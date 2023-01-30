import { shipTypes, Ship } from "./ship"
export {GameBoard}

const shipOrientation = {
  HORIZONTAL: Symbol(`horizontal`),
  VERTICAL: Symbol(`vertical`),
}

const gameboardActions = {
  placeShips(){

  },
  getAttack(){

  },
}


function GameBoard(){
  const gameboard = Object.create(gameboardActions);
  gameboard.ships= [];
  gameboard.missedShots= [];
  gameboard.tiles= Array.from(Array(this.size), ()=>Array.from(Array(this.size)));
  gameboard.size= 10;

  return gameboard;
}


