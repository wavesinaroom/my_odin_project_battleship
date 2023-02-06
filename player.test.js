import {GameBoard} from "./gameboard";
import { Player } from "./player"

const player = Player(`Pablo`);

describe(`Player set up`, ()=>{
  test(`Player's name is Pablo`,()=>{
    expect(player.name).toMatch(/^[A-Z]+$/i); 
  });
  test(`Player has a board to play with`, ()=>{
    expect(player.board).toMatchObject(GameBoard());
  });
  test(`Player fires a missile`, ()=>{

  })
})
