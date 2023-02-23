import {randomCoordinate, randomShipType, randomOrientation} from './cpu'
import {GameManager} from './gamemanager';
beforeAll(()=>{
  GameManager.setUpGame(`Pablo`);  
});

describe(`Random values`,()=>{
  test(`Random coordinate`,()=>{
    const aCoordinate = randomCoordinate();
    expect(aCoordinate).not.toBeUndefined();
    expect(aCoordinate.x).toBeGreaterThanOrEqual(0);
    expect(aCoordinate.x).toBeLessThanOrEqual(9);
    expect(aCoordinate.y).toBeGreaterThanOrEqual(0);
    expect(aCoordinate.y).toBeLessThanOrEqual(9);
  });
  test(`Random ship type`,()=>{
    expect(()=>{randomShipType()}).not.toBeUndefined();
  });
  test(`Random ship orientation`,()=>{
    expect(()=>{randomOrientation()}).not.toBeUndefined();
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

  })
});
