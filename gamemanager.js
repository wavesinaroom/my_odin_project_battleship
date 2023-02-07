import {Player} from "./player";
export {GameManager}

const GameManager = {
  turn: undefined,
  player: undefined,
  cpu: Player(),
  
  setUpPlayer(name){
    this.player = Player(name);
    this.player = this.player.name;
  }
}
