import {shipType} from './ship'
import { GameBoard, coordinate, shipOrientation,tile } from "./gameboard";
const myBoard = GameBoard();  

describe(`Coordinates`,()=>{
  test(`Coordinates are inside board boundaries`,()=>{
    expect(()=>{coordinate(11,1)}).toThrowError(`X coordinate is out of boundaries`);
    expect(()=>{coordinate(-1,1)}).toThrowError(`X coordinate is out of boundaries`);
    expect(()=>{coordinate(1,11)}).toThrowError(`Y coordinate is out of boundaries`);
    expect(()=>{coordinate(1,-1)}).toThrowError(`Y coordinate is out of boundaries`);
  });
});


describe(`Game board set up`, ()=>{
  test('Game board size has to be 10',()=>{
    expect(myBoard.size).toBe(10);
  });
});

describe(`Ship placement`,()=>{
  myBoard.placeShip(shipType.DESTROYER, shipOrientation.HORIZONTAL, coordinate(4,4));

  test(`Place a DESTROYER ship on board center`, ()=>{
    expect(myBoard.ships[0].coordinates).toContainEqual(coordinate(4,4));  
    expect(myBoard.ships.length).toEqual(1);
  });

  test(`Ships can't overlap on board`,()=>{
    expect(()=>{myBoard.placeShip(shipType.BATTLESHIP, shipOrientation.VERTICAL, coordinate(4,4))}).toThrowError(`There's already a ship on that coordinate`);
  });
  
  test(`Place a horizontal BATTLESHIP on board`, ()=>{
    myBoard.placeShip(shipType.BATTLESHIP, shipOrientation.HORIZONTAL, coordinate(5,5));
    expect(myBoard.ships[1].coordinates).toContainEqual(coordinate(6,5));
  });

  test(`Place a vertical BATTLESHIP on board`, ()=>{
    myBoard.placeShip(shipType.BATTLESHIP, shipOrientation.VERTICAL, coordinate(1,5));
    expect(myBoard.ships[2].coordinates).toContainEqual(coordinate(1,8));
  });

  test(`Part of a ship is out of X boundaries`,()=>{
    expect(()=>{myBoard.placeShip(shipType.BATTLESHIP,shipOrientation.HORIZONTAL, coordinate(7,7))}).toThrowError(`Part of ship is out of board boundaries`);
  });

  test(`Part of a ship is out of Y boundaries`,()=>{
    expect(()=>{myBoard.placeShip(shipType.BATTLESHIP,shipOrientation.VERTICAL, coordinate(1,9))}).toThrowError(`Part of ship is out of board boundaries`);
  });
});

describe(`Get attack from enemy`,()=>{
  const hitSpy = jest.spyOn(myBoard.ships[0], 'hit');
  test(`Missile hits Target`,()=>{
    myBoard.getAttack(coordinate(4,4));
    expect(myBoard.missiles.length).toBe(1);
    expect(hitSpy).toBeCalledWith(coordinate(4,4));
  });
  test(`Missile misses Target`,()=>{
    myBoard.getAttack(coordinate(6,4));
    expect(myBoard.missiles.length).toBe(2);
    expect(hitSpy).not.toBeCalled();
    expect(myBoard.missiles[myBoard.missiles.length-1].hit).toBeFalsy();
  });
  test(`Ships is sunk`,()=>{
    myBoard.getAttack(coordinate(5,4));
    expect(myBoard.ships[0].isSunk).toBeTruthy();
  });
});

describe(`Sunk fleet`, ()=>{
  test(`All ships in log are sunk`, ()=>{
    for(let i = 0; i<4; ++i){
      myBoard.getAttack(coordinate(5+i,5));
      myBoard.getAttack(coordinate(1,5+i));
    }

    myBoard.ships.forEach(ship=>{
      expect(ship.isSunk).toBeTruthy();
    });
  })
});
