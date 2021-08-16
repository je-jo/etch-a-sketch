const container = document.getElementById("container");
let size = 10;
const cells = document.getElementsByClassName("cell"); //live collection
let paintMethod = "mouseenter";
let opacity = 1;

const toggleButton = document.getElementById("toggle");
 



function createGrid(size) {
    clearAll();
    for (let i = 1; i <= size ** 2; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell", "bordered");
        container.appendChild(cell);
        container.setAttribute("style", `grid-template-columns: repeat(${size}, 1fr);`);
        toggleButton.addEventListener("click", function (e) {
            cell.classList.toggle("bordered");
         });
    }
    addListener();
    console.log("new grid created")
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
        console.log("Opacity is set to " + opacity)
    });
};

function colorCell(e) {
    e.currentTarget.style.backgroundColor = `${color}`;

    if (opacity <= 0.9 && e.currentTarget.style.opacity <= 0.9) { //without the first condition, opacity of 1 becomes 0.1
        opacity = e.currentTarget.style.opacity; // without this line, the counter never resets for individual cells
        e.currentTarget.style.opacity = (+`${opacity}` + 0.1);
    }
    else {
        e.currentTarget.style.opacity = 1;
    }

    console.log(e.currentTarget.style.opacity)
}

function clearAll() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}



// clear canvas
const clear = document.getElementById("clear");
clear.addEventListener("click", eraser);

function eraser(_e) {
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeAttribute("style"); // removes color and opacity settings from previous paint job
    }
}




// color buttons
const colorButtons = document.getElementsByClassName("pallete");
let color = "orange" //default
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
        console.log("Paint method is set to " + paintMethod);
        addListener()
    });
};






// create new grid
const inputSize = document.getElementById("gridsize");
inputSize.addEventListener("change", updateValue);

function updateValue(e) {
    size = e.target.value;
    console.log(size)
}

const createButton = document.getElementById("creategrid");
createButton.addEventListener("click", function (e) {
    let confirmCreate = confirm(`You are about to clear all your work and create a new ${size}x${size} grid. Are you sure?`);
    if (confirmCreate == true) {
        createGrid(size);
    }
    else {
        return
    }
});





createGrid(10);


