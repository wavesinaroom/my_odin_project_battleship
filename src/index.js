import _ from 'lodash'
import './style.css' 
import {coordinate} from './gameboard'
import GridPanel from './panelboard';

const board = GridPanel('Pablo');
alert(`Yaaa`)
document.body.appendChild(board.content);
board.renderCell(coordinate(4,5),'p')
