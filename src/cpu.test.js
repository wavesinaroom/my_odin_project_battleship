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
  test(`Find out target ship orientation`, ()=>{
    expect(cpu.checkAxis(coordinate(4,4), coordinate(4,7))).toBe(shipOrientation.VERTICAL);
    expect(cpu.checkAxis(coordinate(4,4), coordinate(4,2))).toBe(shipOrientation.VERTICAL);
    expect(cpu.checkAxis(coordinate(4,4), coordinate(7,4))).toBe(shipOrientation.HORIZONTAL);
    expect(cpu.checkAxis(coordinate(4,4), coordinate(2,4))).toBe(shipOrientation.HORIZONTAL);
    expect(cpu.checkAxis(coordinate(4,3), coordinate(4,9))).not.toBe(shipOrientation.VERTICAL);
    expect(cpu.checkAxis(coordinate(4,6), coordinate(0,0))).not.toBe(shipOrientation.VERTICAL);
    expect(cpu.checkAxis(coordinate(9,5), coordinate(0,5))).not.toBe(shipOrientation.HORIZONTAL);
    expect(cpu.checkAxis(coordinate(8,7), coordinate(1,7))).not.toBe(shipOrientation.HORIZONTAL);
    expect(cpu.checkAxis(coordinate(1,1), coordinate(9,9))).not.toBe(shipOrientation.VERTICAL);
    expect(cpu.checkAxis(coordinate(1,1), coordinate(9,9))).not.toBe(shipOrientation.HORIZONTAL);
  });
});
