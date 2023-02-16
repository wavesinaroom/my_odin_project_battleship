"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["panelBoard"],{

/***/ "./src/panelboard.js":
/*!***************************!*\
  !*** ./src/panelboard.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GridPanel)
/* harmony export */ });
function GridPanel(tableName){
  const gridPanel = Object.create(gridActions)
  gridPanel.content = document.createElement('table');
  gridPanel.content.innerHTML += `<caption>${tableName}</caption>`;
  gridPanel.cells = createGrid();  
  gridPanel.content.appendChild(gridPanel.cells);
  return gridPanel;
}

const gridActions = {
  renderCell(coordinate, character){
      this.cells.querySelectorAll(`tr`)[coordinate.x].querySelectorAll(`td`)[coordinate.y].innerHTML = character;
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


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/panelboard.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWxCb2FyZC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBLDZDQUE2QyxVQUFVO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLE1BQU07QUFDdkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsTUFBTTtBQUN2QjtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BhbmVsYm9hcmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gR3JpZFBhbmVsKHRhYmxlTmFtZSl7XG4gIGNvbnN0IGdyaWRQYW5lbCA9IE9iamVjdC5jcmVhdGUoZ3JpZEFjdGlvbnMpXG4gIGdyaWRQYW5lbC5jb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKTtcbiAgZ3JpZFBhbmVsLmNvbnRlbnQuaW5uZXJIVE1MICs9IGA8Y2FwdGlvbj4ke3RhYmxlTmFtZX08L2NhcHRpb24+YDtcbiAgZ3JpZFBhbmVsLmNlbGxzID0gY3JlYXRlR3JpZCgpOyAgXG4gIGdyaWRQYW5lbC5jb250ZW50LmFwcGVuZENoaWxkKGdyaWRQYW5lbC5jZWxscyk7XG4gIHJldHVybiBncmlkUGFuZWw7XG59XG5cbmNvbnN0IGdyaWRBY3Rpb25zID0ge1xuICByZW5kZXJDZWxsKGNvb3JkaW5hdGUsIGNoYXJhY3Rlcil7XG4gICAgICB0aGlzLmNlbGxzLnF1ZXJ5U2VsZWN0b3JBbGwoYHRyYClbY29vcmRpbmF0ZS54XS5xdWVyeVNlbGVjdG9yQWxsKGB0ZGApW2Nvb3JkaW5hdGUueV0uaW5uZXJIVE1MID0gY2hhcmFjdGVyO1xuICB9XG59XG5mdW5jdGlvbiBjcmVhdGVSb3cgKCl7XG4gIGxldCByb3cgPSAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKVxuICBmb3IobGV0IGkgPSAwOyBpPDEwOyArK2kpXG4gICAgcm93LmlubmVySFRNTCArPSBgPHRkPi48L3RkPmA7XG4gIHJldHVybiByb3c7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUdyaWQoKXtcbiAgbGV0IGJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpXG4gIGZvcihsZXQgaSA9IDA7IGk8MTA7ICsraSlcbiAgICBib2R5LmFwcGVuZENoaWxkKGNyZWF0ZVJvdygpKTtcbiAgcmV0dXJuIGJvZHk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=