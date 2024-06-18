let things;

function setup() {
    noStroke();
    createCanvas(windowWidth, windowHeight);
    things = [new PolygonWall([
        [313, 261],
        [452, 292],
        [479, 416],
        [387, 519],
        [255, 470],
        [232, 353]
    ]), new PolygonWall([
        [824, 261],
        [722, 305],
        [729, 416],
        [780, 522],
        [952, 474],
        [978, 345]
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