// todo: between-frame calculations to truly determine what collide first etc
// todo: angle on ball collisions
// for walls

const balls = [];
const static = [];
let mainb;
let hole;

let camera;

function setup() {
    noStroke();
    createCanvas(windowWidth, windowHeight);
    balls.push(new Ball(width / 2 - 30, height / 2, 30));
    balls.push(new Ball(width / 2 + 30, height / 2, 30));

    static.push(new Wall(width - 200, height / 2 - 100, 25, 200));

    static.push(new Bouncer(width / 2, height / 2 - 80, 30));
    static.push(new Bouncer(width / 2 - 70, height / 2 - 120, 30));
    static.push(new Bouncer(width / 2 + 70, height / 2 - 120, 30));

    static.push(new Slope(200, height / 2 - 100, 100, 200, createVector(0, -1)));

    hole = new Hole(width / 2 + 90, height / 2);

    mainb = new MainBall(width / 2, height / 2 + 200);
    balls.push(mainb);

    camera = new Camera(0, 0, width, height);
}

function draw() {
    background(123, 255, 123);

    camera.draw();

    push();
    strokeWeight(1);
    stroke(0);
    line(0, 0, width, 0);
    line(0, 0, 0, height);
    line(width, 0, width, height);
    line(0, height, width, height);
    pop();

    // duplicate twice, so as to newton's third law
    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        for (let j = 0; j < balls.length; j++) {
            if (i == j) continue;
            const other = balls[j];
            if (circCircCol(ball.pos, ball.r, other.pos, other.r)) {
                ball.collide(other);
            }
        }

        for (const obj of static) {
            if (obj.isColliding(ball)) {
                obj.collide(ball);
            }
        }
    }

    if (hole.isColliding(mainb)) {
        console.log(hole.collide(mainb));
        if (hole.collide(mainb)) {
            console.log('next level');
            noLoop();
        }
    }

    hole.draw();

    for (const ball of balls) {
        ball.draw();
    }

    for (const obj of static) {
        obj.draw();
    }
}

function mouseClicked() {
    // if (mainb.vel.mag() != 0) return;

    const vec = p5.Vector.sub(createVector(mousex, mousey), mainb.pos).div(32);
    console.log("start", mousex, mousey);
    console.log("vec", vec.x, vec.y);
    mainb.vel = vec;
}
