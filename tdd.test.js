import {shipTypes, Ship} from './ship'

test('Create a Battleship', ()=>{
  const myShip = Ship(shipTypes.BATTLESHIP) 
  expect(myShip.length).toBe(4);
})
