import {GameManager} from './gamemanager'
export {EventManager}

const EventManager = {
  player: GameManager.player,
  cpu: GameManager.cpu,
  hit: false,

  handleAttack(who, coordinate){
    /*if(who!==GameManager.turn)
      throw new Error(`Invalid turn`);*/
    who === `CPU` ? this.player.board.getAttack(coordinate):this.cpu.board.getAttack(coordinate);
    if(this.player.board.missiles[this.player.board.missiles.length-1].hit)
      this.hit = true;
    else if(this.cpu.board.missiles[this.cpu.board.missiles.length-1].hit)
      this.hit = true;
    else
      this.hit = false;

    //GameManager.changeTurn(who);
  }
}
