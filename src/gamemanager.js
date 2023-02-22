import {Player} from "./player"; 
export {GameManager}

const GameManager = {
  turn: undefined,
  player: undefined,
  cpu: undefined,
  
  setUpGame(name){
    if(!name)
      throw new Error(`Player needs a name`);
    this.player = Player(name);
    this.turn = this.player.name;
    this.cpu = Player();
  },

  changeTurn(who){
    if(this.player.board.sunkFleet||this.cpu.board.sunkFleet)
      this.gameOver();
    else
      who === this.cpu.name? this.turn = this.player.name : this.turn = this.cpu.name;

/*    if(this.turn === `CPU`)
      this.cpu.fire();*/
  },

  gameOver(){
    this.player = undefined;
    this.cpu = undefined;
  }

}
