import {shipType,Ship} from './ship'
import {GameBoard, coordinate, shipOrientation} from './gameboard'

describe(`Ship`,()=>{
  const myShip = Ship(shipType.BATTLESHIP, shipOrientation.HORIZONTAL) 
  test(`Create a Battleship`, ()=>{
    expect(myShip.length).toBe(4);
  })
  test(`Throw exception if no shipType is specified`,()=>{
    expect(()=>{Ship()}).toThrowError(`Can't create ship without a specific ship type`);
  })
  test(`Hit points increase when hit function is called`, ()=>{
    myShip.hit();
    expect(myShip.hitpoints).toBe(1);
  })
  test(`Ship is sunk`, ()=>{
    myShip.hit();
    myShip.hit();
    myShip.hit();
    myShip.hit();
    expect(myShip.isSunk).toBeTruthy();
  })
})

describe(`GameBoard`,()=>{
  const myBoard = GameBoard();
  let myCoordinate = coordinate(4,4);
  test(`Check board constant size equals 10`, ()=>{
    expect(myBoard.size).toBe(10); 
  })
  test(`Place a DESTROYER ship on board center`, ()=>{
    myBoard.placeShips(shipType.DESTROYER, shipOrientation.HORIZONTAL, myCoordinate);  
    expect(myBoard.tiles.has(`${myCoordinate.x},${myCoordinate.y}`)).toBeTruthy();
  })
  test(`Ships can't overlap on board`,()=>{
    expect(()=>{myBoard.placeShips(shipType.BATTLESHIP,shipOrientation.VERTICAL, myCoordinate)}).toThrowError(`There's already an object on that coordinate`);
  })
  test(`Place a horizontal BATTLESHIP on board`, ()=>{
    myCoordinate.x = 5;
    myCoordinate.y = 5;
    myBoard.placeShips(shipType.BATTLESHIP,shipOrientation.HORIZONTAL, myCoordinate);
    expect(myBoard.tiles.has(`${myCoordinate.x+3},${myCoordinate.y}`)).toBeTruthy();
  })
  test(`Place a vertical BATTLESHIP on board`, ()=>{
    myCoordinate.y = 1;
    myCoordinate.x = 1;
    myBoard.placeShips(shipType.BATTLESHIP,shipOrientation.VERTICAL, myCoordinate);
    expect(myBoard.tiles.has(`${myCoordinate.x},${myCoordinate.y+3}`)).toBeTruthy();
  })

  test(`Part of a ship is out of X boundaries`,()=>{
    myCoordinate.x = 7;
    myCoordinate.y = 7;
    expect(()=>{myBoard.placeShips(shipType.BATTLESHIP,shipOrientation.HORIZONTAL, myCoordinate)}).toThrowError(`Part of ship is out of board X boundary`);
    
  })
  test(`Part of a ship is out of Y boundaries`,()=>{
    myCoordinate.x = 6;
    expect(()=>{myBoard.placeShips(shipType.BATTLESHIP,shipOrientation.VERTICAL, myCoordinate)}).toThrowError(`Part of ship is out of board Y boundary`);
  })

  test(`Ship is logged after being placed`,()=>{
    myCoordinate.x = 4;
    myCoordinate.y = 4;
    expect(myBoard.shipsLog.has(`${myCoordinate.x},${myCoordinate.y}`)).toBeTruthy();
    expect(myBoard.shipsLog.has(`${myCoordinate.x},${myCoordinate.y+1}`)).toBeFalsy();
  })
})
