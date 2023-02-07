import {GameManager} from './gamemanager'
export {EventManager}

const EventManager = {
  gameManager: GameManager,
  notifyAttack(who, coordinate){
    if(!who)
      throw new Error(`Unknown player`);
    else
      if(who === `CPU`){
        GameManager.player.board.getAttack(coordinate)  
        GameManager.turn = GameManager.player.name;
      }else{
        GameManager.cpu.board.getAttack(coordinate);
        GameManager.turn = who;
      }
  }
}
