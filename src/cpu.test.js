import {randomCoordinate, randomShipType} from './cpu'

describe(`Random values`,()=>{
  test(`randomCoordinate`,()=>{
    const aCoordinate = randomCoordinate();
    expect(aCoordinate).not.toBeUndefined();
    expect(aCoordinate.x).toBeGreaterThanOrEqual(0);
    expect(aCoordinate.x).toBeLessThanOrEqual(9);
    expect(aCoordinate.y).toBeGreaterThanOrEqual(0);
    expect(aCoordinate.y).toBeLessThanOrEqual(9);
  });
  test(`Random ship type`,()=>{
    const aShiptType = randomShipType();
    expect(aShiptType).not.toBeUndefined();
  });
});
