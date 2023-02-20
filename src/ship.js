export {shipType, Ship}

const shipType = {
  CARRIER: Symbol(`carrier`),
  BATTLESHIP: Symbol(`battleship`),
  CRUISER: Symbol(`cruiser`),
  DESTROYER: Symbol(`destroyer`),
}

const shipActions = {
  hit(input){
    this.coordinates.splice(this.coordinates.findIndex((coord)=>{
      return (coord.x === input.x && coord.y === input.y);
    }),1);

    if(this.coordinates.length === 0)
      return this.isSunk = true;
  },
}

function Ship(type){

  const ship = Object.create(shipActions); 
  ship.coordinates = Array(getShipSize(type));
  ship.isSunk = false;

  return ship;
}

function getShipSize(type){
  switch(type){
    case shipType.DESTROYER:
      return 2;
    case shipType.CRUISER:
      return 3;
    case shipType.BATTLESHIP:
      return 4;
    case shipType.CARRIER:
      return 5;
    default:
        throw new Error(`No ship type specified`);
  }
}
