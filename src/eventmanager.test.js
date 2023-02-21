import {EventManager} from "./eventmanager";
import { coordinate } from "./gameboard";
import {GameManager} from "./gamemanager";
import { Player } from "./player";

  GameManager.player = Player(`Pablo`);
  GameManager.cpu = Player(`CPU`);

describe(`Handling a player's attack`,()=>{
  const attackSpy = jest.spyOn(EventManager, 'handleAttack');
  GameManager.cpu.fire(coordinate(4,4));
  expect(attackSpy).toBeCalledWith(`CPU`,coordinate(4,4));
  expect(EventManager.hit).toBeTruthy();
});
