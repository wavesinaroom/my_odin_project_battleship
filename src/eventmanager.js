export {EventManager}
import {GameManager} from './gamemanager'

const EventManager = {
  gameManager: GameManager,
  notifyAttack(who, coordinate){
    if(!who)
      throw new Error(`Unknown player`);
    else if(who!==GameManager.turn)
      throw new Error(`Invalid turn`);
    else
      who === `CPU` ? GameManager.player.board.getAttack(coordinate):GameManager.cpu.board.getAttack(coordinate);
    GameManager.changeTurn(who);
  }
}
