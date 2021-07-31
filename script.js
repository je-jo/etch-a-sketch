const container = document.getElementById("container");
let size = 16;
container.setAttribute("style", `grid-template-columns: repeat(${size}, 1fr);`);

const square = size * size;


for (i = 1; i <= square; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    container.appendChild(cell);
}

const cells = document.getElementsByClassName("cell");

for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener('mouseenter', myFunction);
}

function myFunction(e) {
    e.target.style.backgroundColor = "cadetblue";
}

const clear = document.getElementById("clear");

clear.addEventListener("click", clearAll)

function clearAll() {
    for (var i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = "white";
    }}