import * as CPU  from './cpu'
import {coordinate} from './gameboard';
import {GameManager} from './gamemanager';
beforeAll( ()=>{
  GameManager.setUpGame(`Pablo`);  
});

describe(`Random values`,()=>{
  test(`Random coordinate`,()=>{
    const myCoordinate = CPU.randomCoordinate();
    expect(myCoordinate).not.toBeUndefined();
    expect(myCoordinate.x).toBeGreaterThanOrEqual(0);
    expect(myCoordinate.x).toBeLessThanOrEqual(9);
    expect(myCoordinate.y).toBeGreaterThanOrEqual(0);
    expect(myCoordinate.y).toBeLessThanOrEqual(9);
  });
  test(`Random ship type`,()=>{
    expect(()=>{CPU.randomShipType()}).not.toBeUndefined();
  });
  test(`Random ship orientation`,()=>{
    expect(()=>{CPU.randomOrientation()}).not.toBeUndefined();
  });
});

describe(`Random ship placement`,()=>{
  test(`New ship added automatically`,()=>{
    GameManager.cpu.placeRandomShip();
    expect(GameManager.cpu.board.ships.length).toEqual(1);
  }); 
});

describe(`AI tree generation`,()=>{
  test(`Generate a tree of possible movements from a given coordinate`,()=>{
    const myShotsTree = CPU.shotsTree(coordinate(4,4))
    expect(myShotsTree).not.toBeUndefined();
    expect(myShotsTree.up.y).toEqual(5);
    expect(myShotsTree.right.x).toEqual(5);
    expect(myShotsTree.down.y).toEqual(3);
    expect(myShotsTree.left.x).toEqual(3);
  });
});
