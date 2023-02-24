import {cpu} from './cpu'
import {coordinate} from './gameboard';
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

describe(`AI tree generation`,()=>{
  test(`Generate a tree of possible movements from a given coordinate`,()=>{
    const myShotsTree = cpu.generateTree(coordinate(4,4))
    expect(myShotsTree).not.toBeUndefined();
    expect(myShotsTree.up.coordinate.y).toEqual(5);
    expect(myShotsTree.right.coordinate.x).toEqual(5);
    expect(myShotsTree.down.coordinate.y).toEqual(3);
    expect(myShotsTree.left.coordinate.x).toEqual(3);
  });
  test(`Generate a tree from an existing shotsTree`,()=>{

  });
});
