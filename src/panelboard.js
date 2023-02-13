export default function GridPanel(tableName){
  const gridPanel = Object.create(gridActions)
  gridPanel.content = document.createElement('table');
  gridPanel.content.innerHTML += `<caption>${tableName}</caption>`;
  gridPanel.cells = createGrid();  
  gridPanel.content.appendChild(gridPanel.cells);
  return gridPanel;
}

const gridActions = {
  renderCell(coordinate, character){
      this.cells.querySelectorAll(`tr`)[coordinate[0]].querySelectorAll(`td`)[coordinate[1]].innerHTML = character;
  }
}
function createRow (){
  let row =  document.createElement('tr')
  for(let i = 0; i<10; ++i)
    row.innerHTML += `<td>.</td>`;
  return row;
}

function createGrid(){
  let body = document.createElement('tbody')
  for(let i = 0; i<10; ++i)
    body.appendChild(createRow());
  return body;
}
