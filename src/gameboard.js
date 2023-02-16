import {  Ship } from "./ship"
export {GameBoard, coordinate, shipOrientation}

function coordinate(x,y){
  //Coordinates are zero based, that's why the boardsize-1 shift
  const boardSize = 10;
  if(x > boardSize-1 || x < 0)
    throw new Error(`X coordinate is out of boundaries`);
  if(y > boardSize-1 || y < 0)
    throw new Error(`Y coordinate is out of boundaries`);
  return{x:x, y:y}
}

const shipOrientation = {
  HORIZONTAL: Symbol(`horizontal`),
  VERTICAL: Symbol(`vertical`),
}

const gameboardActions = {

  checkBoundaries(inputCoordinate, shipLength){
    if(inputCoordinate.x + shipLength > this.size||inputCoordinate.y + shipLength > this.size)
      throw new Error(`Part of ship is out of board X boundary`);
  },

  generateCoordinates(orientation, inputCoordinate, array){

    if(orientation === shipOrientation.HORIZONTAL)
      for(let i = 0; i<array.length; ++i)
        array[i] = coordinate(inputCoordinate.x+i, inputCoordinate.y) ;
    else if(orientation === shipOrientation.VERTICAL)
      for(let i = 0; i<array.length; ++i)
        array[i] = coordinate(inputCoordinate.x, inputCoordinate.y+1) ;
  },

  placeShip(shipType, orientation, inputCoordinate){

    this.ships.forEach(ship=>{
      ship.coordinates.forEach(coord=>{
        if(coord.x === inputCoordinate.x && coord.y === inputCoordinate.y)
          throw new Error(`There's already a ship in that position`);
      }); 
    });
    
    const ship = Ship(shipType);

    this.checkBoundaries(inputCoordinate, ship.coordinates.length);
    this.generateCoordinates(orientation, inputCoordinate, ship.coordinates);

    this.ships.push(ship);
  },

  getAttack(inputCoordinate){
    /*let isShip, ID;
    this.tiles.forEach(tile=>{
      if(tile.coordinate.y===inputCoordinate.y&&tile.coordinate.x===inputCoordinate.x&&tile.id){
        ID = tile.id;
        return isShip = true;
      }
    })

    if(isShip){
      this.shipsLog.get(ID).hit()
      if(this.shipsLog.get(ID).isSunk){
        this.removeShip(ID);
        this.checkSunkFleet();
      }
    }else
      this.tiles.push(tile(inputCoordinate, undefined));*/
  },

  removeShip(ID){
    /*this.shipsLog.delete(ID);
    for(let i = 0; i<this.tiles.length; ++i)
      if(this.tiles[i].id===ID)
        this.tiles.splice(i,1);*/
  },

  checkSunkFleet(){
    /*this.shipsLog.size === 0 ? this.sunkFleet=true:this.sunkFleet=false;*/
  }

}


function GameBoard (){
  const gameboard = Object.create(gameboardActions);
  gameboard.ships = [];
  gameboard.missiles= []; 
  gameboard.size= 10;
  gameboard.sunkFleet = false;

    return gameboard;
}


