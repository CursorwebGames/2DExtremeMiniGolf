function setup() {
    noStroke();
    createCanvas(windowWidth, windowHeight);
}

let things = [new Water([
    [450, 228],
    [378, 269],
    [358, 453],
    [620, 498],
    [623, 328]
]), new PolygonWall([
    [243, 402],
    [261, 563],
    [418, 629],
    [233, 679],
    [135, 504]
])];

let points = [];

function draw() {
    background(123, 255, 123);

    fill(99, 88, 77);
    beginShape();
    for (const [x, y] of points) {
        vertex(x, y);
    }
    endShape();

    for (const x of things) {
        x.draw();
    }
}

function mouseClicked() {
    points.push([round(mouseX), round(mouseY)]);
    let text = "new Water([\n";
    for (let i = 0; i < points.length; i++) {
        const [x, y] = points[i];
        text += `    [${x}, ${y}]${i < points.length - 1 ? "," : ""}\n`;
    }
    text += "])";
    console.log(text);
}