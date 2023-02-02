import {  Ship } from "./ship"
export {GameBoard, coordinate, shipOrientation, tile}

function coordinate(x,y){
  const boardSize = 10;
  if(x > boardSize || x < 1)
    throw new Error(`X coordinate is out of boundaries`);
  if(y > boardSize || y < 1)
    throw new Error(`Y coordinate is out of boundaries`);
  return{x:x, y:y}
}

function tile(coordinate, id){
  return{coordinate: coordinate, id: id}
}

const shipOrientation = {
  HORIZONTAL: Symbol(`horizontal`),
  VERTICAL: Symbol(`vertical`),
}

const gameboardActions = {
  placeShips(shipType, orientation, inputCoordinate){
    const ship = Ship(shipType);
    ship.ID = `${inputCoordinate.x},${inputCoordinate.y}`;
  
    this.tiles.forEach(tile=>{
      if(tile.coordinate.x === inputCoordinate.x && tile.coordinate.y === inputCoordinate.y)
      throw new Error(`There's already an object on that input coordinate`);
    })

    if(orientation === shipOrientation.HORIZONTAL){
      if(inputCoordinate.x + ship.length > this.size)
        throw new Error(`Part of ship is out of board X boundary`);
      for(let i = 0; i<ship.length; ++i)
        this.tiles.push(tile(coordinate(inputCoordinate.x+i, inputCoordinate.y), `${ship.ID}`));
    }else if(orientation === shipOrientation.VERTICAL){
      if(inputCoordinate.y + ship.length > this.size)
        throw new Error(`Part of ship is out of board Y boundary`);
      for(let i = 0; i<ship.length; ++i)
        this.tiles.push(tile(coordinate(inputCoordinate.x, inputCoordinate.y+i), `${ship.ID}`));
    }else
      throw new Error(`Undefined ship orientation`);

    this.shipsLog.set(`${ship.ID}`,ship);
  },

  getAttack(inputCoordinate){
    let isShip, ID;
    this.tiles.forEach(tile=>{
      if(tile.coordinate.y===inputCoordinate.y&&tile.coordinate.x===inputCoordinate.x&&tile.id){
        ID = tile.id;
        return isShip = true;
      }
    })

    if(isShip){
      this.shipsLog.get(ID).hit()
      if(this.shipsLog.get(ID).isSunk)
        this.removeShip(ID);
    }else
      this.shipsLog.set(coordinate(inputCoordinate.x, inputCoordinate.y), undefined);
  },

  removeShip(ID){
    this.shipsLog.delete(ID);
    for(let i = 0; i<this.tiles.length; ++i)
      if(this.tiles[i].id===ID)
        this.tiles.splice(i,1);
  }
}


function GameBoard (){
  const gameboard = Object.create(gameboardActions);
  gameboard.shipsLog = new Map();
  gameboard.tiles= []; 
  gameboard.size= 10;

    return gameboard;
}


