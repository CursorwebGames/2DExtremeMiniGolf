// wrapper class to store ui components which can affect the object properties
// components themselves can be dragged and dropped

let mainb;
let hole;
let currUI;
let statics = [];

function setup() {
    noStroke();
    createCanvas(900, 900).parent(document.querySelector(".canvas-content"));
    mainb = new BallUI(new MainBall(width / 2, height / 2));
    hole = new BallUI(new Hole(width / 2, height / 2));
}

function draw() {
    background(123, 255, 123);

    hole.draw();

    for (const obj of statics) {
        obj.draw();
    }

    mainb.draw();

    if (currUI) {
        currUI.move();
    }
}

function mousePressed() {
    if (mainb.checkCollision()) {
        currUI = mainb;
    } else if (hole.checkCollision()) {
        currUI = hole;
    }

    currUI.selected = true;
}

function mouseReleased() {
    currUI.selected = false;
    currUI = null;
}