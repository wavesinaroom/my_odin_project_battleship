import { EventManager } from "./eventmanager";
import { coordinate } from "./gameboard";
import { Player } from "./player";
export {CPU};

const CPU = ()=> {
  const cpu = Player();
  cpu.fire = function() {
    let randomCoordinate = coordinate(randomTillTen(),randomTillTen());
    
    if(cpu.board.tiles.includes(randomCoordinate)){
      randomCoordinate.x = randomTillTen();
      randomCoordinate.y = randomTillTen();
    }

    EventManager.notifyAttack(cpu.name, randomCoordinate);
  } 
  return cpu;
}

function randomTillTen(){
  return Math.floor(Math.random()*10);
}
