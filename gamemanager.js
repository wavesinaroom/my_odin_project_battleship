import {Player} from "./player";
export {GameManager}

const GameManager = {
  turn: undefined,
  player: undefined,
  cpu: Player(),
  
  setUpPlayer(name){
    this.player = Player(name);
    this.turn = this.player.name;
  },

  changeTurn(who){
    if(this.player.board.sunkFleet||this.cpu.sunkFleet)
      gameOver();
    else
      who === `CPU`? this.turn = this.player.name : this.turn = who;
  },

  gameOver(){
    this.player.board.tiles.splice(0, this.player.tiles.length-1);
    this.player.board.shipsLog.clear();
    this.player = undefined;

    this.cpu.board.tiles.splice(0, this.cpu.tiles.length-1);
    this.cpu.board.shipsLog.clear();
  }

}
