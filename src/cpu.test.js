import {randomCoordinate} from './cpu'
import {coordinate} from './gameboard';

describe(`Random values`,()=>{
  test(`randomCoordinate`,()=>{
    const aCoordinate = randomCoordinate();
    expect(aCoordinate).not.toBeUndefined();
    expect(aCoordinate.x).toBeGreaterThanOrEqual(0);
    expect(aCoordinate.x).toBeLessThanOrEqual(9);
    expect(aCoordinate.y).toBeGreaterThanOrEqual(0);
    expect(aCoordinate.y).toBeLessThanOrEqual(9);
  });
});
