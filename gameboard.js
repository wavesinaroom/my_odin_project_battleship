import {  Ship } from "./ship"
export {GameBoard, coordinate, shipOrientation}

function coordinate(x,y){
  const boardSize = 10;
  if(x > boardSize || x < 1)
    throw new Error(`X coordinate is out of boundaries`);
  if(y > boardSize || y < 1)
    throw new Error(`Y coordinate is out of boundaries`);
  return{x:x, y:y}
}

const shipOrientation = {
  HORIZONTAL: Symbol(`horizontal`),
  VERTICAL: Symbol(`vertical`),
}

const gameboardActions = {
  placeShips(shipType, orientation, coordinate){
    const ship = Ship(shipType);
    ship.ID = coordinate;
    let newCoordinate; 
  
    if(this.tiles.has(`${coordinate.x},${coordinate.y}`))
      throw new Error(`There's already an object on that coordinate`);

    if(orientation === shipOrientation.HORIZONTAL){
      if(coordinate.x + ship.length > this.size)
        throw new Error(`Part of ship is out of board X boundary`);
      for(let i = 0; i<ship.length; ++i){
        newCoordinate = `${coordinate.x+i},${coordinate.y}`
        this.tiles.set(newCoordinate, ship.ID);
      }
    }else if(orientation === shipOrientation.VERTICAL){
      if(coordinate.y + ship.length > this.size)
        throw new Error(`Part of ship is out of board Y boundary`);
      for(let i = 0; i<ship.length; ++i){
        newCoordinate = `${coordinate.x},${coordinate.y+i}`
        this.tiles.set(newCoordinate, ship.ID);
      }
    }else
      throw new Error(`Undefined ship orientation`);

    this.shipsLog.set(ship.ID, ship.shipType);

  },
  getAttack(){

  },
}


function GameBoard (){
  const gameboard = Object.create(gameboardActions);
  gameboard.shipsLog= new Map(); 
  gameboard.missedShots= [];
  gameboard.tiles= new Map(); 
  gameboard.size= 10;

    return gameboard;
}


