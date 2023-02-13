import _ from 'lodash'
import './style.css' 
import GridPanel from './panelboard';

const board = GridPanel('Pablo');
alert(`Yaaa`)
document.body.appendChild(board.content);
const test = [1,2]
board.renderCell(test,'p')
