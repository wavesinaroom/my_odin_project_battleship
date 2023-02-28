import Missile from './missile';
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
    const myShotsTree = cpu.generateTree(Missile(coordinate(4,4)))
  test(`Generate a tree of possible movements from a given coordinate`,()=>{
    expect(myShotsTree).not.toBeUndefined();
    expect(myShotsTree.centre.hit).toBeTruthy();
    expect(myShotsTree.up).toBeUndefined();
    expect(myShotsTree.right).toBeUndefined();
    expect(myShotsTree.down).toBeUndefined();
    expect(myShotsTree.left).toBeUndefined();
  });
  test(`Skip already hit coordinates when expanding tree`,()=>{
    cpu.expandTree(myShotsTree, Missile(coordinate(4,5)));
    expect(myShotsTree.up).toMatchObject(cpu.generateTree(Missile(coordinate(4,5))))
  });
});
