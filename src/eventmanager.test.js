import {EventManager} from "./eventmanager";
import { coordinate, shipOrientation } from "./gameboard";
import {GameManager} from "./gamemanager";
import Missile from "./missile";
import { Player } from "./player";
import {shipType} from "./ship";

GameManager.player = Player(`Pablo`);
GameManager.cpu = Player(`CPU`);
GameManager.player.board.placeShip(shipType.DESTROYER, shipOrientation.HORIZONTAL, coordinate(4,5));
GameManager.turn = `CPU`;
EventManager.player = GameManager.player;
EventManager.cpu = GameManager.cpu;

describe(`handleAttack`,()=>{
  const missileSpy = jest.spyOn(EventManager, 'handleAttack');

  test(`Handling a player's attack`,()=>{
    GameManager.cpu.fire(coordinate(4,4));
    expect(missileSpy).toBeCalledWith(`CPU`,Missile(coordinate(4,4)));
    expect(EventManager.hit).toBeFalsy();
  });

});

describe(`Change player turn`,()=>{
  test(`Invalid turn`,()=>{
    expect(()=>{GameManager.cpu.fire(coordinate(5,5))}).toThrowError(`Invalid turn`);
  });
  test(`It's player's turn`,()=>{
    expect(GameManager.turn).toBe(GameManager.player.name);
  });
});

