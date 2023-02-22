import {EventManager} from "./eventmanager";
import {GameManager} from "./gamemanager";
EventManager.player = jest.fn(()=>{
  const name = 'James';
  function fire (){ console.log('here') }
  return name, fire;
})

describe(`Player set up`,()=>{
  test(`GameManager can't unnamed players`,()=>{
    expect(()=>{GameManager.setUpGame()}).toThrowError(`Player needs a name`);
  });
});
