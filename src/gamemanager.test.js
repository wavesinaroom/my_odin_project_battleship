import {EventManager} from "./eventmanager";
import {coordinate, shipOrientation} from "./gameboard";
import {GameManager} from "./gamemanager";
import {Player} from "./player";
import {shipType} from "./ship";

beforeAll(()=>{
  GameManager.setUpGame('Pablo');
  EventManager.cpu = GameManager.cpu;
  EventManager.player = GameManager.player;
});

describe(`Player set up`,()=>{
  test(`GameManager can't unnamed players`,()=>{
    expect(()=>{GameManager.setUpGame()}).toThrowError(`Player needs a name`);
  });
  test(`GameManager sets up CPU automatically`, ()=>{
    expect(GameManager.cpu.name).toBe(`CPU`);
  });
  test(`GameManager turn is set up to Player`,()=>{
    expect(GameManager.turn).toBe(GameManager.player.name);
  });
  test(`CPU and player are actual instances of Player()`,()=>{
    expect(GameManager.player).toMatchObject(Player(GameManager.player.name));
    expect(GameManager.cpu).toMatchObject(Player());
  });
});

describe(`Game over`,()=>{
  const gameOverSpy = jest.spyOn(GameManager, 'gameOver');
  test(`Call gameOver function when either player loses`,()=>{
    GameManager.player.board.placeShip(shipType.DESTROYER, shipOrientation.HORIZONTAL, coordinate(4,4));
    GameManager.cpu.board.placeShip(shipType.DESTROYER,shipOrientation.HORIZONTAL, coordinate(1,1));
    GameManager.player.fire(coordinate(3,3));
    GameManager.cpu.fire(coordinate(4,4));
    GameManager.player.fire(coordinate(5,3));
    GameManager.cpu.fire(coordinate(5,4));
    expect(gameOverSpy).toBeCalled();
    expect(GameManager.player).toBeUndefined();
    expect(GameManager.cpu).toBeUndefined();
  });
});
