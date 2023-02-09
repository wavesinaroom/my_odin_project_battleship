import {Player} from "./player"; 
export {GameManager}

const GameManager = {
  turn: undefined,
  player: undefined,
  cpu: undefined,
  
  setUpPlayer(name){
    this.player = Player(name);
    this.turn = this.player.name;
    this.cpu = Player();
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
    this.cpu.board.shipsLog.clear();
  }

}
