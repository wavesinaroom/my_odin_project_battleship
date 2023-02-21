import {GameManager} from './gamemanager'
export {EventManager}

const EventManager = {
  gameManager: GameManager,
  playerBoard: GameManager.player.board,
  cpuBoard: GameManager.cpu.board,
  hit: false,

  handleAttack(who, coordinate){
    if(who!==GameManager.turn)
      throw new Error(`Invalid turn`);

    who === `CPU` ? player.board.getAttack(coordinate):cpu.board.getAttack(coordinate);

    if(this.playerBoard.missiles[this.playerBoard.missiles.length-1].hit)
      hit = true;
    else if(this.cpuBoard.missiles[this.cpuBoard.missiles.length-1].hit)
      hit = true;
    else
      hit = false;

    GameManager.changeTurn(who);
  }
}
