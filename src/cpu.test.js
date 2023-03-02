import Missile from './missile';
import {coordinate} from './gameboard';
import {GameManager} from './gamemanager';
beforeAll( ()=>{
  GameManager.setUpGame(`Pablo`);  
});

describe(`Random values`,()=>{
  test(`Random coordinate`,()=>{
    const myCoordinate = GameManager.cpu.randomCoordinate();
    expect(myCoordinate).not.toBeUndefined();
    expect(myCoordinate.x).toBeGreaterThanOrEqual(0);
    expect(myCoordinate.x).toBeLessThanOrEqual(9);
    expect(myCoordinate.y).toBeGreaterThanOrEqual(0);
    expect(myCoordinate.y).toBeLessThanOrEqual(9);
  });
  test(`Random ship type`,()=>{
    expect(()=>{GameManager.cpu.randomShipType()}).not.toBeUndefined();
  });
  test(`Random ship orientation`,()=>{
    expect(()=>{GameManager.cpu.randomOrientation()}).not.toBeUndefined();
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
    test(`Main on board centre - Hit on right - No distance between shots`,()=>{
      const moves = GameManager.cpu.generateMoves(Missile(coordinate(4,4)), Missile(coordinate(5,4))); 
      expect(moves.length).toEqual(6);
      expect(moves[2].hit).toBeTruthy();
      expect(moves[3].hit).toBeTruthy();
    });
    test(`Main on board centre - Hit on right - 1 of distance between shots`,()=>{
      const moves = GameManager.cpu.generateMoves(Missile(coordinate(4,4)), Missile(coordinate(6,4))); 
      expect(moves.length).toEqual(5);
      expect(moves[1].hit).toBeTruthy();
      expect(moves[3].hit).toBeTruthy();
    });
    test(`Main on board centre - Hit on right - 2 of distance between shots`,()=>{
      const moves = GameManager.cpu.generateMoves(Missile(coordinate(4,4)), Missile(coordinate(7,4))); 
      expect(moves.length).toEqual(4);
      expect(moves[0].hit).toBeTruthy();
      expect(moves[3].hit).toBeTruthy();
    });
    test(`Main on board centre - Hit on left - no distance between shots`,()=>{
      const moves = GameManager.cpu.generateMoves(Missile(coordinate(4,4)), Missile(coordinate(3,4)));
      expect(moves.length).toEqual(6);
      expect(moves[0].coordinate.x).toEqual(1);
      expect(moves[5].coordinate.x).toEqual(6);
    });
    test(`Main on board centre - Hit on left - 1 of distance between shots`,()=>{
      const moves = GameManager.cpu.generateMoves(Missile(coordinate(4,4)), Missile(coordinate(2,4)));
      expect(moves.length).toEqual(5);
      expect(moves[0].coordinate.x).toEqual(1);
      expect(moves[4].coordinate.x).toEqual(5);
    });
    test(`Main on board centre - Hit on left - 2 of distance between shots`,()=>{
      const moves = GameManager.cpu.generateMoves(Missile(coordinate(4,4)), Missile(coordinate(1,4)));
      expect(moves.length).toEqual(4);
      expect(moves[0].coordinate.x).toEqual(1);
      expect(moves[3].coordinate.x).toEqual(4);
    });
  });
  describe(`Vertical`,()=>{
    test(`Main on board centre - Hit on up - No distance between shots`,()=>{
      const moves = GameManager.cpu.generateMoves(Missile(coordinate(4,4)), Missile(coordinate(4,5))); 
      expect(moves.length).toEqual(6);
      expect(moves[2].hit).toBeTruthy();
      expect(moves[3].hit).toBeTruthy();
    });
    test(`Main on board centre - Hit on up - 1 of distance between shots`,()=>{
      const moves = GameManager.cpu.generateMoves(Missile(coordinate(4,4)), Missile(coordinate(4,6))); 
      expect(moves.length).toEqual(5);
      expect(moves[1].hit).toBeTruthy();
      expect(moves[3].hit).toBeTruthy();
    });
    test(`Main on board centre - Hit on up - 2 of distance between shots`,()=>{
      const moves = GameManager.cpu.generateMoves(Missile(coordinate(4,4)), Missile(coordinate(4,7))); 
      expect(moves.length).toEqual(4);
      expect(moves[0].hit).toBeTruthy();
      expect(moves[3].hit).toBeTruthy();
    });
    test(`Main on board centre - Hit on down - no distance between shots`,()=>{
      const moves = GameManager.cpu.generateMoves(Missile(coordinate(4,4)), Missile(coordinate(4,3)));
      expect(moves.length).toEqual(6);
      expect(moves[0].coordinate.y).toEqual(1);
      expect(moves[5].coordinate.y).toEqual(6);
    });
    test(`Main on board centre - Hit on down - 1 of distance between shots`,()=>{
      const moves = GameManager.cpu.generateMoves(Missile(coordinate(4,4)), Missile(coordinate(4,2)));
      expect(moves.length).toEqual(5);
      expect(moves[0].coordinate.y).toEqual(1);
      expect(moves[4].coordinate.y).toEqual(5);
    });
    test(`Main on board centre - Hit on down - 2 of distance between shots`,()=>{
      const moves = GameManager.cpu.generateMoves(Missile(coordinate(4,4)), Missile(coordinate(4,1)));
      expect(moves.length).toEqual(4);
      expect(moves[0].coordinate.y).toEqual(1);
      expect(moves[3].coordinate.y).toEqual(4);
    });
  });
  describe(`Off board`,()=>{
    test(`Beyond left border`,()=>{
      const moves = GameManager.cpu.generateMoves(Missile(coordinate(0,4)), Missile(coordinate(1,4)));
      expect(moves.length).toEqual(4);
    });
    test(`Beyond right border`,()=>{
      const moves = GameManager.cpu.generateMoves(Missile(coordinate(8,4)), Missile(coordinate(9,4)));
      expect(moves.length).toEqual(4);
    });
    test(`Beyond top border`,()=>{
      const moves = GameManager.cpu.generateMoves(Missile(coordinate(4,0)), Missile(coordinate(4,1)));
      expect(moves.length).toEqual(4);
    });
    test(`Beyond bottom border`,()=>{
      const moves = GameManager.cpu.generateMoves(Missile(coordinate(4,8)), Missile(coordinate(4,9)));
      expect(moves.length).toEqual(4);
    });
  });
  describe(`Incoming hit out of range`,()=>{
    test(`Beyond horizontal range`,()=>{
      GameManager.cpu.generateMoves(Missile(coordinate(4,4)), Missile(coordinate(8,4)));
      expect(GameManager.cpu.hits.length).toEqual(1);
      GameManager.cpu.hits = [];
    });
    test(`Beyond vertical range`,()=>{
      GameManager.cpu.generateMoves(Missile(coordinate(4,4)), Missile(coordinate(4,8)));
      expect(GameManager.cpu.hits.length).toEqual(1);
      GameManager.cpu.hits = [];
    });
  })
});

describe(`Moves update`,()=>{
  test(`Empty CPU hits, grows on updateMoves method call`,()=>{
    expect(GameManager.cpu.updateMoves(Missile(coordinate(4,4)))).toBeFalsy();
    expect(GameManager.cpu.hits.length).toEqual(1);
  });
  test(`Updates existing move and return true`,()=>{
    GameManager.cpu.hits[0] = GameManager.cpu.generateMoves(GameManager.cpu.hits[0], Missile(coordinate(2,4)));
    expect(GameManager.cpu.updateMoves(Missile(coordinate(3,4)))).toBeTruthy();
    expect(GameManager.cpu.hits[0][2].hit).toBeTruthy();
  });
  test(`Does not update inexisting moves`,()=>{
    expect(GameManager.cpu.updateMoves(Missile(coordinate(7,4)))).toBeFalsy();
  });
});

describe(`Random Shot`,()=>{
  test(`Returns a random coordinate`, ()=>{
    const randomShot = GameManager.cpu.getRandomShot();
    expect(randomShot).not.toBeUndefined();
    expect(randomShot.x).not.toBeNaN();
    expect(randomShot.y).not.toBeNaN();
  });
});
