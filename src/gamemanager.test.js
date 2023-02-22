import {experiments} from "webpack";
import {EventManager} from "./eventmanager";
import {GameManager} from "./gamemanager";
import {Player} from "./player";
EventManager.player = jest.fn(()=>{
  const name = 'James';
  function fire (){ console.log('here') }
  return name, fire;
})

describe(`Player set up`,()=>{
  test(`GameManager can't unnamed players`,()=>{
    expect(()=>{GameManager.setUpGame()}).toThrowError(`Player needs a name`);
  });
  test(`GameManager sets up CPU automatically`, ()=>{
    GameManager.setUpGame('Pablo');
    expect(GameManager.cpu.name).toBe(`CPU`);
  });
  test(`GameManager turn is set up to Player`,()=>{
    expect(GameManager.turn).toBe(GameManager.player.name);
  });
  test(`CPU and player are actual instances of Player()`,()=>{
    expect(GameManager.player).toMatchObject(Player(GameManager.player.name));
    expect(GameManager.cpu).toMatchObject(Player());
  });
});
