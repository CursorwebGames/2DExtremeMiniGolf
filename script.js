// todo: between-frame calculations to truly determine what collide first etc
// for walls

const balls = [];
const walls = [];
let mainb;

function setup() {
    noStroke();
    createCanvas(windowWidth, windowHeight);
    balls.push(new Ball(width / 2 - 30, height / 2, 30));
    balls.push(new Ball(width / 2 + 30, height / 2, 30));

    walls.push(new Wall(width / 2 - 100, height / 2 - 200, 200, 40));


    // debug:
    // mainb = new Ball(467, 557);
    // balls.push(mainb);
}

function draw() {
    background(123, 255, 123);

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

        for (const wall of walls) {
            if (circRectCol(ball.pos.x, ball.pos.y, ball.r, wall.x, wall.y, wall.w, wall.h)) {
                wall.collide(ball);
            }
        }
    }

    for (const ball of balls) {
        ball.draw();
    }

    for (const wall of walls) {
        wall.draw();
    }
}

// debug:
// function keyPressed() {
//     if (!isLooping()) loop(); else noLoop();
// }

function mouseClicked() {
    // mainb.vel = createVector(2, -16);
    if (!mainb) {
        mainb = new MainBall(mouseX, mouseY);
        balls.push(mainb);
    } else {
        const vec = p5.Vector.sub(createVector(mouseX, mouseY), mainb.pos).div(32);
        console.log("start", mouseX, mouseY)
        console.log("vec", vec.x, vec.y);
        mainb.vel = vec;
    }
}

function circCircCol(vec1, r1, vec2, r2) {
    return vec1.dist(vec2) <= r1 + r2;
}

function circRectCol(cx, cy, r, rx, ry, rw, rh) {
    let testx, testy;

    // check if on left edge, then check collision left edge, etc
    if (cx < rx) testx = rx;
    else if (cx > rx + rw) testx = rx + rw;
    else testx = cx; // within the rect, so collide

    if (cy < ry) testy = ry;
    else if (cy > ry + rh) testy = ry + rh;
    else testy = cy;

    let distx = cx - testx;
    let disty = cy - testy;

    return Math.sqrt(distx ** 2 + disty ** 2) < r;
}