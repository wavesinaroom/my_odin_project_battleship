import {randomCoordinate, randomShipType, randomOrientation} from './cpu'

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
