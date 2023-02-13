import _ from 'lodash'
import './style.css' 
import panelBoard from './panelboard'

const board = panelBoard(`Pablo`)
alert(`Yaaa`)
document.body.appendChild(board);
board.querySelectorAll('tr')[0].innerHTML = `papaya`
board.querySelectorAll('tr')[5].querySelectorAll('td')[9].innerHTML = `3`
