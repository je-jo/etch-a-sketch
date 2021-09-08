const container = document.getElementById("container");
const cells = document.getElementsByClassName("cell"); //live collection
let size = 12;
let paintMethod = "mouseenter";
let opacity = 1;
let color = "1e272e"; //default black
let randomColors = [];
const toggleButton = document.getElementById("toggle");

function createGrid(size) {
    clearAll();
    for (let i = 1; i <= size ** 2; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell", "bordered");
        container.appendChild(cell);
        container.setAttribute("style", `grid-template-columns: repeat(${size}, 1fr);`);
        toggleButton.addEventListener("click", function () {
            cell.classList.toggle("bordered");
        });
    }
    updateListener();
}

function clearAll() {     //remove all created squares
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}
function updateListener() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener(`${paintMethod}`, colorCell);
    }
}
function removeListener() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener(`${paintMethod}`, colorCell);
    }
}

// hover or click
const methods = document.getElementsByName("method");
for (let i = 0; i < methods.length; i++) {
    methods[i].addEventListener("click", function (e) {
        removeListener(); //remove old listener before asigning new one
        paintMethod = e.currentTarget.id;
        updateListener()
    });
};



function colorCell(e) {
    if (color == "rainbow") {
        randomColors.splice(0, 3);
        generateColor();
        e.currentTarget.style.backgroundColor = `rgb(${randomColors})`;
    }
    else {
        e.currentTarget.style.backgroundColor = `#${color}`;
    }

    if (opacity <= 0.9 && e.currentTarget.style.opacity <= 0.9) { //without the first condition, opacity of 1 becomes 0.1
        opacity = e.currentTarget.style.opacity; // without this line, the counter never resets for individual cells
        e.currentTarget.style.opacity = (+`${opacity}` + 0.1);
    }
    else {
        e.currentTarget.style.opacity = 1;
    }
}

function generateColor() {
    for (let i = 0; randomColors.length < 3; i++) {
        randomColors.push(Math.floor(Math.random() * 256));
    }
}
// transparency
const transparency = document.getElementsByName("opacity");
for (let i = 0; i < transparency.length; i++) {
    transparency[i].addEventListener("click", function (e) {
        opacity = +e.currentTarget.id;
    });
};


// clear canvas
const clear = document.getElementById("clear");
clear.addEventListener("click", eraser);

function eraser() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeAttribute("style"); // removes color and opacity settings from previous paint job
    }
}

// color buttons
const colorButtons = document.getElementsByClassName("pallete");
const active = document.getElementsByClassName("active");

for (let i = colorButtons.length - 1; i >= 0; i--) {
    colorButtons[i].addEventListener('click', removeActive);
    colorButtons[i].addEventListener('click', function (e) {
        color = e.currentTarget.id;
        e.currentTarget.classList.add("active");
    });
}

function removeActive() {
    for (let i = active.length - 1; i >= 0; i--) {
        active[i].classList.remove('active');
    }
};




// create new grid
const inputSize = document.getElementById("gridsize");
inputSize.addEventListener("change", updateValue);

function updateValue(e) {
    size = e.target.value;
}

const createButton = document.getElementById("creategrid");
createButton.addEventListener("click", function () {
    let confirmCreate = confirm(`You are about to clear all your work and create a new ${size}x${size} grid. Are you sure?`);
    if (confirmCreate == true) {
        createGrid(size);
    }
    else {
        return
    }
});

// hidable menus
const palleteButton = document.getElementById("btn-pallete");
const palleteMenu = document.getElementById("pallete-wrapper");
const settingsButton = document.getElementById("btn-settings");
const settingsMenu = document.getElementById("settings");
function toggleMenu(item) {
    if (item.style.display == "flex") {
        item.style.display = "none";
    } else {
        item.style.display = "flex";
    }
}

palleteButton.addEventListener("click", function () {   // the roundabout way to use named function with parameters inside event listener 
    toggleMenu(palleteMenu);
});

settingsButton.addEventListener("click", function () {
    toggleMenu(settingsMenu);
});



createGrid(24);


