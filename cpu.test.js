import { GameManager } from "./gamemanager";

describe(`CPU set up`, ()=>{
  GameManager.setUpPlayer(`Pablo`)
  test(`There's a CPU player`,()=>{
    expect(GameManager.cpu).not.toBeUndefined();
  })
})
