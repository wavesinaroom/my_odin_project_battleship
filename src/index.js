import _ from 'lodash'
import './style.css' 
import GridPanel from './panelboard';

<<<<<<< HEAD
function component(){
  console.log('anything');;
  const element = document.createElement('div');
  
element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  const myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component());
=======
const board = GridPanel('Pablo');
alert(`Yaaa`)
document.body.appendChild(board.content);
const test = [1,2]
board.renderCell(test,'p')
>>>>>>> 1b6392449cf20273bf91fa019084e8088436e50e