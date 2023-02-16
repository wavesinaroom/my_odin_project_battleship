export {shipType, Ship}

const shipType = {
  CARRIER: Symbol(`carrier`),
  BATTLESHIP: Symbol(`battleship`),
  CRUISER: Symbol(`cruiser`),
  DESTROYER: Symbol(`destroyer`),
}


const shipActions = {
  hit(input){
    this.coordinates.slice(this.coordinates.findIndex((coord)=>{(coord.x===input.x&&coord.y===input.y)}));

    if(this.coordinates.length === 0)
      return this.isSunk = true;
  },
}

function Ship(){

  const ship = Object.create(shipActions); 
  ship.coordinates = [];
  ship.isSunk = false;

  return ship;
}

