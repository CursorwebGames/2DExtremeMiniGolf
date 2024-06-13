function setup() {
    noStroke();
    createCanvas(windowWidth, windowHeight);
}

let things = [new PolygonWall([
    [204, 153],
    [102, 261],
    [179, 383],
    [362, 486],
    [388, 329],
    [380, 225],
    [290, 278],
    [234, 213],
    [235, 161]
]),
new PolygonWall([
    [275, 113],
    [296, 179],
    [376, 193],
    [495, 176],
    [500, 248],
    [470, 329],
    [448, 383],
    [496, 421],
    [563, 430],
    [620, 326],
    [650, 221],
    [632, 103],
    [554, 49],
    [410, 45],
    [304, 45],
]), new PolygonWall([
    [407, 450],
    [405, 557],
    [500, 478]
]), new PolygonWall([
    [144, 523],
    [214, 624],
    [420, 645],
    [631, 589],
    [719, 469],
    [726, 329],
    [726, 226],
    [782, 212],
    [860, 259],
    [914, 329],
    [914, 477],
    [848, 579],
    [736, 652],
    [568, 707],
    [384, 729],
    [172, 721],
    [37, 621]
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
    let text = "new PolygonWall([\n";
    for (let i = 0; i < points.length; i++) {
        const [x, y] = points[i];
        text += `    [${x}, ${y}]${i < points.length - 1 ? "," : ""}\n`;
    }
    text += "])";
    console.log(text);
}