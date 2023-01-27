export {shipTypes, Ship}

const shipTypes = {
  CARRIER: Symbol(`carrier`),
  BATTLESHIP: Symbol(`battleship`),
  CRUISER: Symbol(`cruiser`),
  DESTROYER: Symbol(`destroyer`),
}

const shipActions = {
  hit(){
    ++this.hitpoints;
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

  switch(type){
    case(shipTypes.CARRIER):
      ship.length = 5;
      break;
    case(shipTypes.BATTLESHIP):
      ship.length = 4;
      break;
    case(shipTypes.CRUISER):
      ship.length = 3;
      break;
    case(shipTypes.DESTROYER):
      ship.length = 2;
      break;
    default:
      throw new Error(`Can't create ship without a specific type`);
  }
  return ship;
}

