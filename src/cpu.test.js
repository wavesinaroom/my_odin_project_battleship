import Missile from './missile';
import {cpu} from './cpu'
import {coordinate, shipOrientation} from './gameboard';
import {GameManager} from './gamemanager';
beforeAll( ()=>{
  GameManager.setUpGame(`Pablo`);  
});

describe(`Random values`,()=>{
  test(`Random coordinate`,()=>{
    const myCoordinate = cpu.randomCoordinate();
    expect(myCoordinate).not.toBeUndefined();
    expect(myCoordinate.x).toBeGreaterThanOrEqual(0);
    expect(myCoordinate.x).toBeLessThanOrEqual(9);
    expect(myCoordinate.y).toBeGreaterThanOrEqual(0);
    expect(myCoordinate.y).toBeLessThanOrEqual(9);
  });
  test(`Random ship type`,()=>{
    expect(()=>{cpu.randomShipType()}).not.toBeUndefined();
  });
  test(`Random ship orientation`,()=>{
    expect(()=>{cpu.randomOrientation()}).not.toBeUndefined();
  });
});

describe(`Random ship placement`,()=>{
  test(`New ship added automatically`,()=>{
    GameManager.cpu.placeRandomShip();
    expect(GameManager.cpu.board.ships.length).toEqual(1);
  }); 
});

describe(`Moves generation`,()=>{
  describe(`Horizontal`,()=>{
    test(`Main on board centre - no distance between shots`,()=>{
      const moves = cpu.getMoves(Missile(coordinate(4,4)), Missile(coordinate(5,4))); 
      console.log(moves)
      expect(moves.length).toEqual(6);
      expect(moves[2].hit).toBeTruthy();
      expect(moves[3].hit).toBeTruthy();
    });
    test(`Main on board centre - 1 of distance between shots`,()=>{
      const moves = cpu.getMoves(Missile(coordinate(4,4)), Missile(coordinate(6,4))); 
      expect(moves.length).toEqual(5);
      expect(moves[1].hit).toBeTruthy();
      expect(moves[3].hit).toBeTruthy();
    });
    test(`Main on board centre - 2 of distance between shots`,()=>{
      const moves = cpu.getMoves(Missile(coordinate(4,4)), Missile(coordinate(7,4))); 
      expect(moves.length).toEqual(4);
      expect(moves[0].hit).toBeTruthy();
      expect(moves[3].hit).toBeTruthy();
    });
  });
});
