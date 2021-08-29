const container = document.getElementById("container");
let size = 12;
const cells = document.getElementsByClassName("cell"); //live collection
let paintMethod = "mouseenter";
let opacity = 1;
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
    addListener();
}



function addListener() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener(`${paintMethod}`, colorCell);
    }
}

function removeListener() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener(`${paintMethod}`, colorCell);
    }
}

// transparency
const transparency = document.getElementsByName("opacity");
for (let i = 0; i < transparency.length; i++) {
    transparency[i].addEventListener("click", function (e) {
        opacity = +e.currentTarget.id;
    });
};

function colorCell(e) {

    //   e.currentTarget.style.backgroundColor = `rgb(${randomColors})`;
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
        cells[i].removeAttribute("style"); // removes color and opacity settings from previous paint job
    }
}

function generateColor() {
    for (let i = 0; randomColors.length < 3; i++) {
        randomColors.push(Math.floor(Math.random() * 256));
    }
}



// color buttons
const colorButtons = document.getElementsByClassName("pallete");
let color = "ffdd59" //default
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
        removeListener(); //remove old listener before asigning new value
        paintMethod = e.currentTarget.id;
        addListener()
    });
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




const palleteButton = document.getElementById("btn-pallete");
const palleteMenu = document.getElementById("pallete-wrapper");
const settingsButton = document.getElementById("btn-settings");
const settingsMenu = document.getElementById("settings");


let item;
function toggleMenu(item) {
    if (item.style.visibility == "visible") {
        item.style.visibility = "hidden";
    } else {
        item.style.visibility = "visible";
    }
}

palleteButton.addEventListener("click", function () {
    toggleMenu(palleteMenu);
});

settingsButton.addEventListener("click", function () {
    toggleMenu(settingsMenu);
});



createGrid(24);


