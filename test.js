function setup() {
    noStroke();
    createCanvas(windowWidth, windowHeight);
}

let points = [
    [30, 30],
    [80, 30],
    [150, 90],
    [100, 180],
    [40, 170],
].map(([x, y]) => [x + 100, y + 100]);

function draw() {
    background(123, 255, 123);

    fill(99, 88, 77);
    beginShape();
    for (const [x, y] of points) {
        vertex(x, y);
    }
    endShape();

    if (circPolyCol(createVector(mouseX, mouseY), 18, points)) {
        fill(255, 0, 0);
    } else {
        fill(0, 0, 255);
    }
    circle(mouseX, mouseY, 18 * 2);
}