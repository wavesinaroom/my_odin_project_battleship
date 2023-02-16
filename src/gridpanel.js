export default function GridPanel(title){
  let content = document.createElement('table');
  content.innerHTML += `<caption>${title}</caption>`;
  let cells = createGrid();  
  content.appendChild(cells);
  return content;
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

