import {shipType,Ship} from './ship'
import {shipOrientation} from './gameboard'

describe(`Ship`,()=>{
  const myShip = Ship(shipType.BATTLESHIP, shipOrientation.HORIZONTAL) 
  test(`Create a Battleship`, ()=>{
    expect(myShip.length).toBe(4);
  })
  test(`Throw exception if no shipType is specified`,()=>{
    expect(()=>{Ship()}).toThrowError(`Can't create ship without a specific ship type`);
  })
  test(`Hit points increase when hit function is called`, ()=>{
    myShip.hit();
    expect(myShip.hitpoints).toBe(1);
  })
  test(`Ship is sunk`, ()=>{
    myShip.hit();
    myShip.hit();
    myShip.hit();
    myShip.hit();
    expect(myShip.isSunk).toBeTruthy();
  })
})

