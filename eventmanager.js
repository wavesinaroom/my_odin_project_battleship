export {EventManager}

const EventManager = {
  player,
  cpu,
  notifyAttack(who, coordinate){
    if(who === playerLabels.PLAYER)
      player.board.getAttack(coordinate);
    else if(who === playerLabels.CPU)
      cpu.board.getAttack(coordinate);
    else
      throw new Error(`Invalid player`);
  }
}
