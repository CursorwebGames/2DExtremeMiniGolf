// todo: between-frame calculations to truly determine what collide first etc
// for walls

const balls = [];
const static = [];
let mainb;

let mousex, mousey;

let camera;

function setup() {
    noStroke();
    createCanvas(windowWidth, windowHeight);
    balls.push(new Ball(width / 2 - 30, height / 2, 30));
    balls.push(new Ball(width / 2 + 30, height / 2, 30));

    // static.push(new Wall(width / 2 - 100, height / 2 - 200, 200, 40));

    static.push(new Bouncer(width / 2, height / 2 - 80, 30));
    static.push(new Bouncer(width / 2 - 70, height / 2 - 120, 30));
    static.push(new Bouncer(width / 2 + 70, height / 2 - 120, 30));

    static.push(new Slope(200, height / 2 - 100, 100, 200, createVector(0, -1)));

    mainb = new MainBall(width / 2, height / 2 + 200);
    balls.push(mainb);

    camera = new Camera(0, 0, width, height);
}

class Camera {
    constructor(minx, miny, maxx, maxy) {
        this.x = mainb.pos.x;
        this.y = mainb.pos.y;

        // define boundaries of map, padding added
        this.minx = minx - 50 + width / 2;
        this.miny = miny - 50 + height / 2;
        this.maxx = maxx + 50 - width / 2;
        this.maxy = maxy + 50 - height / 2;
    }

    draw() {
        // equation: mainb.x - mainb.x + width / 2
        const tx = width / 2 - this.x;
        const ty = height / 2 - this.y;

        translate(tx, ty);

        // shift mousex from absolute to relative
        // it's absolute because technically mouseX at 0 IS 0 (if the camera wasn't there)
        mousex = mouseX - tx;
        mousey = mouseY - ty;

        this.x = constrain(lerp(this.x, mainb.pos.x, 0.1), this.minx, this.maxx);
        this.y = constrain(lerp(this.y, mainb.pos.y, 0.1), this.miny, this.maxy);
    }
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

        // todo: make this ANY static physics object
        for (const obj of static) {
            if (obj.isColliding(ball)) {
                obj.collide(ball);
            }
        }
    }

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
