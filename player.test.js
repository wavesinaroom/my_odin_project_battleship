import {GameBoard, coordinate, shipOrientation} from "./gameboard";
import { shipType } from "./ship";
import {GameManager} from './gamemanager';
import {Player} from "./player";
import {EventManager} from "./eventmanager";

GameManager.player = Player(`Pablo`)

describe(`Player set up`, ()=>{
  test(`Player's name is Pablo`,()=>{
    expect(GameManager.player.name).toMatch(/^[A-Z]+$/i); 
  });
  test(`Player has a board to play with`, ()=>{
    expect(GameManager.player.board).toMatchObject(GameBoard());
  });
})

describe(`Player's actions`,()=>{

  GameManager.cpu = Player();
  GameManager.cpu.board.placeShips(shipType.DESTROYER, shipOrientation.HORIZONTAL, coordinate(4,4))
  let myCoordinate = coordinate(5,5);
  const eventManager = jest.spyOn(EventManager, 'notifyAttack');
  const cpuGetsAttack = jest.spyOn(GameManager.cpu.board, 'getAttack')

  test(`Pablo fires a missile, he misses his target ship  though`, ()=>{
    GameManager.player.fire(myCoordinate);
    expect(eventManager).toBeCalled();
    expect(cpuGetsAttack).toBeCalledWith(myCoordinate);
    expect(GameManager.cpu.board.shipsLog.has(`${myCoordinate.x},${myCoordinate.y}`)).toBeFalsy();
  })

  test(`Pablo fires a missile and hits his target ship`, ()=>{
    myCoordinate.x = 4;
    myCoordinate.y = 4;

    GameManager.player.fire(myCoordinate);
    expect(eventManager).toBeCalled();
    expect(cpuGetsAttack).toBeCalledWith(myCoordinate);
    expect(GameManager.cpu.board.shipsLog.has(`${myCoordinate.x},${myCoordinate.y}`)).toBeTruthy();
  })
})




