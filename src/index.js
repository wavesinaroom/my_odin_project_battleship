import _ from 'lodash'
import './style.css' 
import GridPanel from './panelboard'
import { shipType } from './ship';

const board = GridPanel('Pablo');
alert(`Yaaa`)
document.body.appendChild(board.content);
const type = shipType.BATTLESHIP;
