import { CPU } from "./cpu";
import { GameManager } from "./gamemanager";

describe(`CPU set up`, ()=>{
  test(`There's a CPU player`,()=>{
    expect(GameManager.cpu).not.toBeUndefined();
  })
})
