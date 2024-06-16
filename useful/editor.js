// wrapper class to store ui components which can affect the object properties
// components themselves can be dragged and dropped

let mainb;
let hole;
let statics = [];
let knots = [];
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
    hole.draw();
    mainb.draw();
    statics[0].draw();

    // the topmost knot will be the most recently added knot
    // only one knot can be checked at a time
    // once a knot is being dragged, don't check for any more collisions
    if (!hasSelected) {
        for (let i = knots.length - 1; i >= 0; i--) {
            const knot = knots[i];
            if (knot.check()) {
                hasSelected = true;
                break;
            }
        }
    }
}

function mouseReleased() {
    hasSelected = false;
}