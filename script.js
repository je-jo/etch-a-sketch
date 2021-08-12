const container = document.getElementById("container");
let size = 16;
const cells = document.getElementsByClassName("cell"); //live collection
let paintMethod = "click";
let opacity = 1;
let currentOpacity;



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
        cells[i].addEventListener(`${paintMethod}`, colorCell);
    }
}

function colorCell() {
    this.style.backgroundColor = `${color}`;
    this.style.opacity = `${opacity}`;
}

function clearAll() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}



// clear canvas
const clear = document.getElementById("clear");
clear.addEventListener("click", eraser);

function eraser() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = "white"
    }
}




// color buttons
const colorButtons = document.getElementsByClassName("pallete");
let color = "steelblue" //default
for (let i = 0; i < colorButtons.length; i++) {
    colorButtons[i].addEventListener('click', function (e) {
        colorButtons[i].classList.remove("active"); //doesnt work
        color = e.currentTarget.id;
        e.currentTarget.classList.add("active");
    });
}


// hover or click
const methods = document.getElementsByName("method");
for (let i = 0; i < methods.length; i++) {
    methods[i].addEventListener("click", function (e) {
        paintMethod = e.currentTarget.id;
        console.log(paintMethod);
    });
};

// transparency
const transparency = document.getElementsByName("opacity");
for (let i = 0; i < transparency.length; i++) {
    transparency[i].addEventListener("click", function (e) {
        opacity = +e.currentTarget.id;
    });
};




// create new grid
const inputSize = document.getElementById("gridsize");
inputSize.addEventListener("change", updateValue);
function updateValue(e) {
    size = e.target.value;
}

const createButton = document.getElementById("creategrid");
createButton.addEventListener("click", function (e) {
    createGrid(size);
});

createGrid(size);


