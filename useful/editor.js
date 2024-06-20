// wrapper class to store ui components which can affect the object properties
// components themselves can be dragged and dropped

let mainb;
let hole;
let statics = [];
let staticKnots = [];
let mousePos;
let hasSelected = false;

function setup() {
    noStroke();
    createCanvas(900, 900).parent(document.querySelector(".canvas-content"));
    hole = new Single(new Hole(width / 2, height / 2));
    mainb = new Single(new MainBall(width / 2, height / 2));
    statics.push(new Polygon(new PolygonWall([])));
}

function draw() {
    mousePos = createVector(mouseX, mouseY);

    background(123, 255, 123);
    for (const obj of statics) {
        obj.draw();
    }
    hole.draw();
    mainb.draw();

    if (!hasSelected) {
        checkKnots();
    }
}

function mouseReleased() {
    hasSelected = false;
}

function checkKnots() {
    // the topmost knot will be the most recently added knot
    // only one knot can be checked at a time
    // once a knot is being dragged, don't check for any more collisions
    // based on reverse render order: hole, balls, objects
    if (mainb.knot.check()) {
        hasSelected = true;
        return;
    }

    if (hole.knot.check()) {
        hasSelected = true;
    }

    for (let i = staticKnots.length - 1; i >= 0; i--) {
        const knot = staticKnots[i];
        if (knot.check()) {
            hasSelected = true;
            return;
        }
    }
}