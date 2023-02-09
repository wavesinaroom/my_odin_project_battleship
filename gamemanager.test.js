import {coordinate, shipOrientation} from "./gameboard"
import {GameManager} from "./gamemanager"
import {Player} from "./player"
import {shipType} from "./ship";

GameManager.cpu = Player();

beforeEach(()=>{
  GameManager.setUpPlayer(`Amy`);
})

describe(`Player set up`,()=>{
  GameManager.setUpPlayer(`Amy`);
  test(`Sets up player's name`,()=>{
    expect(GameManager.player.name).toStrictEqual(`Amy`) 
  })
  test(`Sets up turn`,()=>{
    expect(GameManager.turn).toStrictEqual(`Amy`);
  })
})

describe(`Turn changes`, ()=>{
  describe(`Turn changes on Player/CPU attack`, ()=>{
    const turnSpy = jest.spyOn(GameManager, 'changeTurn')
    GameManager.player.fire(coordinate(4,4));
    expect(turnSpy).toBeCalled();
    expect(GameManager.turn).toStrictEqual(`Amy`);
  })
  describe(`Player/CPU can't attack when out of turn`, ()=>{
    expect(()=>{GameManager.cpu.fire(coordinate(4,4))}).toThrowError(`Invalid turn`)
  })
})

describe(`End game`, ()=>{
  GameManager.cpu.board.placeShips(shipType.DESTROYER, shipOrientation.HORIZONTAL, coordinate(5,5));
  describe(`Players' values are reset`, ()=>{
    const gameOverSpy = jest.spyOn(GameManager, 'gameOver');
    GameManager.player.fire(coordinate(5,5));
    GameManager.player.fire(coordinate(6,5));
    expect(GameManager.cpu.board.sunkFleet).toBeTruthy();
    expect(gameOverSpy).toBeCalled();
    expect(GameManager.player).toBeUndefined();
    expect(GameManager.cpu.board.shipsLog.size).toBe(0);
    expect(GameManager.cpu.board.tiles.length).toBe(0);
  })
})
