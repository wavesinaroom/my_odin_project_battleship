import {coordinate} from "./gameboard";
import { GameManager } from "./gamemanager";

GameManager.setUpGame(`Pablo`)
describe(`Attack`, ()=>{
  test(`Generates a random coordinate`,()=>{
    expect(()=>{GameManager.cpu.randomCoordinate()}).not.toBeUndefined();
    expect(()=>{GameManager.cpu.randomCoordinate()}).not.toEqual(()=>{GameManager.cpu.randomCoordinate()});
  })
})
