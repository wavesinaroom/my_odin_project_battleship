import { Player } from "./player"

const player = Player(`Pablo`);

describe(`Player set up`, ()=>{
  test(`Player's name is Pablo`,()=>{
    expect(player.name).toMatch(/^[A-Z]+$/i); 
  })
})
