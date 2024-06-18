let mainb;

function setup() {
    noStroke();
    createCanvas(900, 900).parent(document.querySelector(".canvas-content"));
    mainb = new BallUI(new MainBall(width / 2, height / 2));
}

function draw() {
    background(123, 255, 123);
    mainb.draw();
}

function mouseDragged() {
    if (mainb.checkCollision()) {
        mainb.move();
    }
}