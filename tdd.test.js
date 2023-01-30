import {shipType,shipOrientation,Ship} from './ship'
import GameBoard from './gameboard'

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
  const myBoard = GameBoard;
  test(`Create a 10x10 GameBoard`, ()=>{
    expect(myBoard.size).toBe(10); 
  })
  test(`Place a horizontal BATTLESHIP on the board center`, ()=>{
    expect(myBoard.cells[4][4]).toBeTruthy();
    expect(myBoard.cells[5][4]).toBeTruthy();
    expect(myBoard.cells[6][4]).toBeTruthy();
    expect(myBoard.cells[7][4]).toBeTruthy();
  })
  test(`Place a vertical BATTLESHIP on the board center`, ()=>{
    expect(myBoard.cells[4][4]).toBeTruthy();
    expect(myBoard.cells[4][5]).toBeTruthy();
    expect(myBoard.cells[4][6]).toBeTruthy();
    expect(myBoard.cells[4][7]).toBeTruthy();
  })
  test(`A ship can't never be placed out of boundaries`,()=>{
    expect(()=>{myBoard.placeShips()}).toThrowError(`Ship is out of boundaries`);
  })
  test(`First BATTLESHIP ID is stored in board records`,()=>{
    expect(myBoard.ships[0]).toBe("B1", [4][4], shipOrientation.HORIZONTAL);
  })
  test(`Board records missed shots`, ()=>{
    expect(myBoard.missedShots[0]).toBe([3][3]);
  })
  test(`Receives effective attack coordinates to increase ship on board hitpoints`, ()=>{
    expect(myBoard.getAttack).toHaveBeenCalled();
    expect(myBoard.ships[0].hit()).toHaveBeenCalled();
    expect(myBoard.ships[0].hitpoints).toBe(1);
  })    
})
