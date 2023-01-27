import * as ship from './ship'
test('adds 1+2 to equal 3', ()=>{
  const myShip = ship.createShip(ship.shipTypes.BATTLESHIP); 
  expect(myShip.length).toBe(4);
})
