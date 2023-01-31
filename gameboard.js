import { shipType, Ship } from "./ship"
export {GameBoard}

function coordinate(x,y){
  if(x > this.size || x < 1)
    throw new Error(`X coordinate is out of boundaries`);
  if(y > this.size || y < 1)
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
    
    //take ship orientation to increase x or y and loop ship.length times, check if each iteration keeps the ship on the board
    if(orientation === shipOrientation.VERTICAL){
      if(coordinate.y + ship.length > this.size)
        throw new Error(`Part of ship is out of board Y boundary`);
      for(let i = 0; i<ship.length; ++i){
        this.tiles.set(ship.ID, coordinate);
        ++coordinate.y;
      }
    }
    else if(orientation === shipOrientation.HORIZONTAL){
      if(coordinate.x + ship.length > this.size)
        throw new Error(`Part of ship is out of board X boundary`);
      for(let i = 0; i<ship.length; ++i){
        this.tiles.set(ship.ID, coordinate);
        ++coordinate.x;
      }
    }
    else
      throw new Error(`Undefined ship orientation`);

    if(ship.orientation == shipOrientation.HORIZONTAL){

    }

    this.shipsRecord.set(ship, ship.ID);


  },
  getAttack(){

  },
}


function GameBoard(){
  const gameboard = Object.create(gameboardActions);
  gameboard.shipsRecord= new Map(); 
  gameboard.missedShots= [];
  //Tiles will store as key and coordinate as value
  gameboard.tiles= new Map(); 
  gameboard.size= 10;

    return gameboard;
}


