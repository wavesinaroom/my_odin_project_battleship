import {shipTypes, Ship} from './ship'

describe('Ship',()=>{
  const myShip = Ship(shipTypes.BATTLESHIP) 
  test('Create a Battleship', ()=>{
    expect(myShip.length).toBe(4);
  })
  test('Throw exception if no shipType is specified',()=>{
    expect(()=>{Ship()}).toThrowError(`Can't create ship without a specific ship type`);
  })
  test('Hit points increase when hit function is called', ()=>{
    myShip.hit();
    expect(myShip.hitpoints).toBe(1);
  })
  test('Ship is sunk', ()=>{
    myShip.hit();
    myShip.hit();
    myShip.hit();
    myShip.hit();
    expect(myShip.isSunk).toBeTruthy();
  })
  test(`Prevent hit function from extra triggering after ship is sunk`, ()=>{
    myShip.hitpoints = 4;
    expect(()=>{myShip.hit()}).toThrowError(`Ship should've been destroyed by now`);
  })
})
