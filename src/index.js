import _ from 'lodash'
import './style.css' 
import panelBoard from './panelboard'

const board = panelBoard(`Pablo`)
alert(`Yaaa`)
document.body.appendChild(board);
board.querySelectorAll('tr')[2].querySelectorAll('td')[5].innerHTML = `3`
