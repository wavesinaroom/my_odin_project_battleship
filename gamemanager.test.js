import {EventManager} from "./eventmanager";
import {coordinate} from "./gameboard"
import {GameManager} from "./gamemanager"
import {Player} from "./player"

GameManager.cpu = Player();

describe(`Player set up`,()=>{
  GameManager.setUpPlayer(`Amy`)
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

})
