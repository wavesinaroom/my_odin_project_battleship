import {coordinate} from "./gameboard";
import { GameManager } from "./gamemanager";

GameManager.setUpGame(`Pablo`)
describe(`Attack`, ()=>{
  test(`Generates a random coordinate`,()=>{
    const coordinateOne = GameManager.cpu.randomCoordinate();
    const coordinateTwo = GameManager.cpu.randomCoordinate();
    expect(coordinateOne).not.toBeUndefined();
    expect(coordinateOne).not.toEqual(coordinateTwo);
  })
})
