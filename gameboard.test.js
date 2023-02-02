import {shipType} from './ship'
import { GameBoard, coordinate, shipOrientation,tile } from "./gameboard";
const myBoard = GameBoard();  
let myCoordinate = coordinate(4,4);
let myTile = tile(myCoordinate,`${myCoordinate.x},${myCoordinate.y}`);

describe(`Game board set up`, ()=>{
  test('Game board size has to be 10',()=>{
    expect(myBoard.size).toBe(10);
  });
});
describe(`Ship placement`,()=>{
  test(`Place a DESTROYER ship on board center`, ()=>{
    myBoard.placeShips(shipType.DESTROYER, shipOrientation.HORIZONTAL, myCoordinate);  
    expect(myBoard.tiles).toContainEqual(myTile);
  })
  test(`Ships can't overlap on board`,()=>{
    expect(()=>{myBoard.placeShips(shipType.BATTLESHIP,shipOrientation.VERTICAL, myCoordinate)}).toThrowError(`There's already an object on that input coordinate`);
  })
  test(`Place a horizontal BATTLESHIP on board`, ()=>{
    myCoordinate = coordinate(5,5);
    myTile.coordinate = myCoordinate;
    myTile.id = `${myCoordinate.x},${myCoordinate.y}`;
    myBoard.placeShips(shipType.BATTLESHIP,shipOrientation.HORIZONTAL, myCoordinate);
    expect(myBoard.tiles).toContainEqual(myTile);
    myTile.coordinate.x = 8;
    expect(myBoard.tiles).toContainEqual(myTile);
  })
  test(`Place a vertical BATTLESHIP on board`, ()=>{
    myCoordinate = coordinate(1,1);
    myTile.coordinate = myCoordinate;
    myTile.id = `${myCoordinate.x},${myCoordinate.y}`;
    myBoard.placeShips(shipType.BATTLESHIP,shipOrientation.VERTICAL, myCoordinate);
    expect(myBoard.tiles).toContainEqual(myTile);
    myTile.coordinate.y = 3;
    expect(myBoard.tiles).toContainEqual(myTile);
  })

  test(`Part of a ship is out of X boundaries`,()=>{
    myCoordinate = coordinate(7,7);
    expect(()=>{myBoard.placeShips(shipType.BATTLESHIP,shipOrientation.HORIZONTAL, myCoordinate)}).toThrowError(`Part of ship is out of board X boundary`);
    
  })
  test(`Part of a ship is out of Y boundaries`,()=>{
    myCoordinate.x = 6;
    expect(()=>{myBoard.placeShips(shipType.BATTLESHIP,shipOrientation.VERTICAL, myCoordinate)}).toThrowError(`Part of ship is out of board Y boundary`);
  })
})

/*describe(`Shots`,()=>{
  let myCoordinate=coordinate(8,8);
  test(`Failed shot logs undefined in GameBoard tiles`, ()=>{
    myBoard.getAttack(myCoordinate);
  })
  test(`Hits a ship`,()=>{
    myCoordinate = coordinate(4,4);
    myBoard.getAttack(myCoordinate);
  })
  test(`Sinking ship`, ()=>{
     
  })
})*/

describe(`Ship log`, ()=>{
  let myCoordinate = coordinate(4,4);
  test(`Ship is logged after being placed`,()=>{
    myCoordinate.x = 4;
    myCoordinate.y = 4;
  })
})
