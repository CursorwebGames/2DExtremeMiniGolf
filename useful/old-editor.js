function setup() {
    noStroke();
    createCanvas(windowWidth, windowHeight);
}

let things = [new Sand([
    [453, 295],
    [635, 363],
    [588, 523],
    [376, 618],
    [506, 669],
    [692, 617],
    [778, 507],
    [789, 385],
    [761, 235],
    [627, 162],
    [488, 161]
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
    let text = "new Sand([\n";
    for (let i = 0; i < points.length; i++) {
        const [x, y] = points[i];
        text += `    [${x}, ${y}]${i < points.length - 1 ? "," : ""}\n`;
    }
    text += "])";
    console.log(text);
}