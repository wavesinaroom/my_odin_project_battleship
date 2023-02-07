import {GameBoard, coordinate} from "./gameboard";
import {GameManager} from './gamemanager';
import {Player} from "./player";
import {EventManager} from "./eventmanager";

GameManager.player = Player(`Pablo`);

describe(`Player set up`, ()=>{
  test(`Player's name is Pablo`,()=>{
    expect(GameManager.player.name).toMatch(/^[A-Z]+$/i); 
  });
  test(`Player has a board to play with`, ()=>{
    expect(GameManager.player.board).toMatchObject(GameBoard());
  });
})

describe(`Player's actions`,()=>{
  test(`Pablo fires a missile, he misses ship target though`, ()=>{
    const myCoordinate = coordinate(5,5);
    const spy = jest.spyOn(EventManager, 'notifyAttack')
    GameManager.player.fire(myCoordinate);
    expect(spy).toBeCalled();
    expect(GameManager.cpu.getAttack).toBeCalledWith(myCoordinate);
    expect(GameManager.cpu.shipsLog.has(`${myCoordinate.x}, ${myCoordinate.y}`));
  })
})




