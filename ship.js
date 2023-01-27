export{ship, createShip, shipTypes}

const shipTypes = {
  CARRIER: Symbol(`carrier`),
  BATTLESHIP: Symbol(`battleship`),
  CRUISER: Symbol(`cruiser`),
  DESTROYER: Symbol(`destroyer`),
}

const ship = {
  length:1,
  hitpoints:0,
  isSunk:false,
  hit(){
    ++this.hitpoints;
  },
  checkShipState(){
    if(this.hitpoints==this.length)
      return this.isSunk = true;
  }
}

function createShip(ship){
  switch(ship){
    case(shipTypes.CARRIER):
      const carrier = {
        length: 5,
        __proto__: ship,
      };
      return carrier 
    case(shipTypes.BATTLESHIP):
      const battleship = {
        length: 4,
        __proto__: ship,
      };
      return battleship;
    case(shipTypes.CRUISER):
      const cruiser = {
        length: 3,
        __proto__: ship,
      };
      return cruiser;
    case(shipTypes.DESTROYER):
      const destroyer = {
        length: 2,
        __proto__: ship,
      };
      return destroyer;
  }
}


