let things;

function setup() {
    noStroke();
    createCanvas(windowWidth, windowHeight);
    things = [new PolygonWall([
        [333, 196],
        [489, 211],
        [489, 274],
        [422, 275],
        [369, 296],
        [371, 365],
        [429, 378],
        [502, 350],
        [516, 397],
        [484, 438],
        [414, 451],
        [355, 432],
        [295, 370],
        [306, 267]
    ]), new PolygonWall([
        [922, 190],
        [797, 179],
        [794, 123],
        [872, 108],
        [955, 120],
        [1008, 170],
        [1014, 253],
        [993, 329],
        [946, 376],
        [870, 383],
        [792, 366],
        [799, 309],
        [847, 293],
        [944, 273]
    ])];
}


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
    let text = "new PolygonWall([\n";
    for (let i = 0; i < points.length; i++) {
        const [x, y] = points[i];
        text += `    [${x}, ${y}]${i < points.length - 1 ? "," : ""}\n`;
    }
    text += "])";
    console.log(text);
}