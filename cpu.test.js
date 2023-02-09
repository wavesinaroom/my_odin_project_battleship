import {EventManager} from "./eventmanager";
import {coordinate, tile} from "./gameboard";
import { GameManager } from "./gamemanager";

GameManager.setUpGame(`Pablo`)
describe(`Attack`, ()=>{
  test(`Generates a random coordinate`,()=>{
    expect(()=>{GameManager.cpu.randomCoordinate()}).not.toBeUndefined();
    expect(()=>{GameManager.cpu.randomCoordinate()}).not.toEqual(()=>{GameManager.cpu.randomCoordinate()});
  })
  test(`Checks random coordinate is not in tiles list already`, ()=>{
    GameManager.cpu.board.tiles.push(tile(GameManager.cpu.randomCoordinate(), GameManager.cpu.name))
    expect(GameManager.cpu.board.tiles).not.toContainEqual(tile(GameManager.cpu.randomCoordinate(), GameManager.cpu.name));
  })
  test(`Fires a missile with random coordinates`, ()=>{
    const eventSpy = jest.spyOn(EventManager, 'notifyAttack');
    GameManager.player.fire(coordinate(1,10));
    expect(eventSpy).toHaveBeenCalledTimes(2);
  })
})
