export default function panelBoard(tableName){
  let table = document.createElement('table');
  function addHeader(header){
    table.innerHTML += `<thead>
                          <tr>
                            <th colspan=10>${header}</th>
                          </tr>
                        </thead>`
  }(tableName);
  const addBody = () =>{
    const body = document.createElement('tbody');
    let rows = [10];
    rows.forEach(row=>{
      row = document.createElement('tr');
      for(let i = 0; i<10; ++i)
        row.appendChild(document.createElement('td'));
      body.appendChild(row);
    }) 
    table.appendChild(body);
  }
  return table;
}

