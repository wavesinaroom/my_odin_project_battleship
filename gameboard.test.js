import {shipType,Ship} from './ship'
import { GameBoard, coordinate, shipOrientation } from "./gameboard";
const myBoard = GameBoard();

describe(`Game board set up`, ()=>{
  test('Game board size has to be 10',()=>{
    expect(myBoard.size).toBe(10);
  });
});
describe(`Ship placement`,()=>{
  let myCoordinate = coordinate(4,4);
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
})

describe(`Shots`,()=>{
  let myCoordinate=coordinate(8,8);
  myBoard.getAttack(myCoordinate);
  test(`Failed shot logs undefined in GameBoard tiles`, ()=>{
    expect(myBoard.tiles.has(`${myCoordinate.x},${myCoordinate.y}`)).toBeFalsy();
    expect(myBoard.tiles.get(`${myCoordinate.x},${myCoordinate.y}`)).toBe(undefined);
  })
})

describe(`Ship log`, ()=>{
  let myCoordinate = coordinate(4,4);
  test(`Ship is logged after being placed`,()=>{
    myCoordinate.x = 4;
    myCoordinate.y = 4;
    expect(myBoard.shipsLog.has(`${myCoordinate.x},${myCoordinate.y}`)).toBeTruthy();
    expect(myBoard.shipsLog.has(`${myCoordinate.x},${myCoordinate.y+1}`)).toBeFalsy();
  })
})
