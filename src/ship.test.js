import {shipType,Ship} from './ship'
import {coordinate} from './gameboard'

describe(`Ship`,()=>{
  const myShip = Ship(shipType.CRUISER);
  test(`Create a ship`, ()=>{
    expect(myShip).not.toBeNull();
    expect(myShip.isSunk).toBeFalsy();
    expect(myShip.coordinates.length).toEqual(3);
  });
  test(`Add three coordinates to ship`,()=>{
    myShip.coordinates[0] = coordinate(4,4);
    myShip.coordinates[1] = coordinate(5,5);
    myShip.coordinates[2] = coordinate(6,6);
    expect(myShip.coordinates.length).toEqual(3);
    expect(myShip.coordinates).toContainEqual(coordinate(4,4));
  });
  test(`Ship gets hit`,()=>{
    myShip.hit(coordinate(6,6));   
    expect(myShip.coordinates.length).toEqual(2);
    expect(myShip.coordinates).not.toContainEqual(coordinate(6,6));
    expect(myShip.isSunk).toBeFalsy();
  });
  test(`Sunken ship`,()=>{
    myShip.hit(coordinate(5,5));
    myShip.hit(coordinate(4,4,));
    expect(myShip.coordinates.length).toEqual(0);
    expect(myShip.isSunk).toBeTruthy();
  });
});

