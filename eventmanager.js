import {GameManager} from './gamemanager'
export {EventManager}

const EventManager = {
  gameManager: GameManager,
  notifyAttack(who, coordinate){
    if(!who)
      throw new Error(`Unknown player`);
    else
      who === `CPU` ? GameManager.player.board.getAttack(coordinate) : GameManager.cpu.board.getAttack(coordinate);

    GameManager.turn = who;
  }
}
