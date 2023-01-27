import {shipTypes, Ship} from './ship'

describe('Ship',()=>{
  const myShip = Ship(shipTypes.BATTLESHIP) 
  test('Create a Battleship', ()=>{
    expect(myShip.length).toBe(4);
  })
  test('Throw exception if no shipType is specified',()=>{
    expect(()=>{Ship()}).toThrowError(`Can't create ship without a specific ship type`);
  })
})
