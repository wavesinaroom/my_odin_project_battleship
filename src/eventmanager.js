import {GameManager} from './gamemanager'
export {EventManager}

const EventManager = {
  player: GameManager.player,
  cpu: GameManager.cpu,
  hit: false,

  handleAttack(who, missile){
    if(who!==GameManager.turn)
      throw new Error(`Invalid turn`);

    who === `CPU` ? this.player.board.getAttack(missile.coordinate):this.cpu.board.getAttack(missile.coordinate);

    if(this.hit)
      missile.hit = true;

    GameManager.changeTurn(who);
  }
}
