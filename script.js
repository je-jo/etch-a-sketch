const container = document.getElementById("container");
let size = 10;
container.setAttribute("style", `grid-template-columns: repeat(${size}, 1fr);`);




const square = size * size;


for (i = 1; i <= square; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute('style', 'background: yellow; border: 1px solid red');   
    container.appendChild(cell);
}

