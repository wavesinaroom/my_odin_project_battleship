import Missile from "./missile";
import {coordinate} from "./gameboard"

describe(`Missile`, ()=>{
  test(`Create a missile`,()=>{
    const myMissile = Missile(coordinate(4,4));
    expect(myMissile).not.toBeNull();
    expect(myMissile.coordinate).toEqual(coordinate(4,4));
    expect(myMissile.hit).toBeFalsy();
  });
});
