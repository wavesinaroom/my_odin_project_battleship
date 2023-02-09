import {Player} from "./player"; 
import {CPU} from "./cpu"
export {GameManager}

const GameManager = {
  turn: undefined,
  player: undefined,
  cpu: CPU,
  
  setUpPlayer(name){
    this.player = Player(name);
    this.turn = this.player.name;
  },

  changeTurn(who){
    if(this.player.board.sunkFleet||this.cpu.board.sunkFleet)
      this.gameOver();
    else
      who === `CPU`? this.turn = this.player.name : this.turn = who;

    if(this.turn === `CPU`)
      this.cpu.fire();
  },

  gameOver(){
    this.player = undefined;
    this.cpu.board.tiles.splice(0, this.cpu.board.tiles.length);
  }

}
