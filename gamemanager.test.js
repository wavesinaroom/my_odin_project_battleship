import {GameManager} from "./gamemanager"

describe(`Player set up`,()=>{
  GameManager.setUpPlayer(`Amy`)
  test(`Sets up player's name`,()=>{
    expect(GameManager.player.name).toStrictEqual(`Amy`) 
  })
  test(`Sets up turn`,()=>{
    expect(GameManager.turn).toStrictEqual(`Amy`);
  })
})

describe(`Turn changes`, ()=>{

})

describe(`End game`, ()=>{

})
