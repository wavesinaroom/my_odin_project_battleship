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
  test(`Check board constant size equals 10`, ()=>{
    expect(myBoard.size).toBe(10); 
  })
  test(`Place a horizontal BATTLESHIP on the board center`, ()=>{
    myBoard.placeShips(shipType.BATTLESHIP,shipOrientation.HORIZONTAL, coordinate(4,4))
    expect(myBoard.tiles.has(coordinate(4,4))).toBeTruthy();
    expect(myBoard.tiles.has(coordinate(4,5))) .toBeTruthy();
  })
  test(`Place a vertical BATTLESHIP on the board center`, ()=>{
    myBoard.placeShips(shipType.BATTLESHIP,shipOrientation.VERTICAL, coordinate(4,4))
    expect(myBoard.tiles.has(coordinate(4,4))).toBeTruthy();
    expect(myBoard.tiles.has(coordinate(5,4))) .toBeTruthy();
  })
  test(`Part of a ship is out of Y boundaries`,()=>{
  })
  test(`Part of a ship is out of X boundaries`,()=>{
  })
  test(`First BATTLESHIP ID is stored in board records`,()=>{
  })
})
