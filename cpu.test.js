import { GameManager } from "./gamemanager";

describe(`CPU set up`, ()=>{
  GameManager.setUpGame(`Pablo`)
  test(`There's a CPU player`,()=>{
    expect(GameManager.cpu).not.toBeUndefined();
  })
})
