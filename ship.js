export {shipType, shipOrientation, Ship}

const shipType = {
  CARRIER: Symbol(`carrier`),
  BATTLESHIP: Symbol(`battleship`),
  CRUISER: Symbol(`cruiser`),
  DESTROYER: Symbol(`destroyer`),
}


const shipActions = {
  hit(){
    if(this.isSunk&&this.hitpoints>this.length)
      throw new Error(`Ship should've been destroyed by now`);

    ++this.hitpoints;
    this.checkShipState();
  },
  checkShipState(){
    if(this.hitpoints==this.length)
      return this.isSunk = true;
  }
}

function Ship(type){

  const ship = Object.create(shipActions); 
  ship.hitpoints = 0;
  ship.isSunk = false;
  ship.ID = undefined;

  switch(type){
    case(shipType.CARRIER):
      ship.length = 5;
      break;
    case(shipType.BATTLESHIP):
      ship.length = 4;
      break;
    case(shipType.CRUISER):
      ship.length = 3;
      break;
    case(shipType.DESTROYER):
      ship.length = 2;
      break;
    default:
      throw new Error(`Can't create ship without a specific ship type`);
  }
  return ship;
}

