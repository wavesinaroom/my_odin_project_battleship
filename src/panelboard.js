export default function panelBoard(tableName){
  let table = document.createElement('table');
    table.innerHTML += `<caption>${tableName}</caption>`;
    table.appendChild(createBody());
  return table;
}

function createRow (){
  let row =  document.createElement('tr')
  for(let i = 0; i<10; ++i)
    row.innerHTML += `<td>.</td>`;
  return row;
}

function createBody(){
  let body = document.createElement('tbody')
  for(let i = 0; i<10; ++i)
    body.appendChild(createRow())
  return body;
}
