const container = document.getElementById("container");
let size = 16;
const square = size ** 2;
const cells = document.getElementsByClassName("cell"); //live collection

createGrid(size);

function createGrid(size) {
    clearAll();
    for (i = 1; i <= size ** 2; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        container.appendChild(cell);
        container.setAttribute("style", `grid-template-columns: repeat(${size}, 1fr);`);
    }
    addListener();
}



function addListener() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('mouseenter', colorCell);
    }
}

function colorCell(e) {
    e.target.style.backgroundColor = `${color}`;
}

const clear = document.getElementById("clear");
clear.addEventListener("click", eraser);

function eraser() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = "white"
    }
}

function clearAll() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

const colorButtons = document.getElementsByClassName("pallete");

let color = "pink"

//function setColor() {
    for (let i = 0; i < colorButtons.length; i++) {
        colorButtons[i].addEventListener('click', function (e) {
            color = e.currentTarget.id;
        e.currentTarget.classList.add("active");
        });
    } 
// }

const inputSize = document.getElementById("gridsize");
inputSize.addEventListener("change", updateValue);
function updateValue(e) {
  size = e.target.value;
}

const createButton = document.getElementById("creategrid");
createButton.addEventListener("click", function (e) {
    createGrid(size);
});




