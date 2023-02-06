import {GameManager} from './gamemanager'
import {playerLabels} from './player'
export {EventManager}

const EventManager = {
  gameManager: GameManager,
  notifyAttack(who, coordinate){
    if(who === playerLabels.PLAYER){
      GameManager.player.board.getAttack(coordinate);
      GameManager.turn = playerLabels.CPU;
    }
    else if(who === playerLabels.CPU){
      GameManager.cpu.board.getAttack(coordinate);
      GameManager.turn = playerLabels.PLAYER
    }
    else
      throw new Error(`Invalid player`);
  }
}
