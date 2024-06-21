// todo: between-frame calculations to truly determine what collide first etc
// todo: angle on ball collisions
// for walls

let levels;
let balls = [];
let static = [];
let mainb;
let hole;

let camera, transition;

let level = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);

    noStroke();
    levels = genLevels();

    generateLevel();

    camera = new Camera(0, 0, width, height);
    transition = new Transition();
}

class Transition {
    constructor() {
        this.a = 0;

        // 0: nothing
        // 1: fade out
        // -1: fade back in
        this.direction = 0;
    }

    draw() {
        fill(255, this.a);
        rect(0, 0, width, height);

        this.a += this.direction * 5;

        if (this.a == 300) {
            level++;
            generateLevel();
            this.direction = -1;
        }

        if (this.a < 0) {
            this.end();
        }
    }

    begin() {
        this.direction = 1;
    }

    end() {
        this.direction = 0;
        this.a = 0;
    }
}

function draw() {
    background(123, 255, 123);

    push();
    camera.draw();

    // todo: boundaries
    push();
    strokeWeight(1);
    stroke(255);
    line(0, 0, width, 0);
    line(0, 0, 0, height);
    line(width, 0, width, height);
    line(0, height, width, height);
    pop();

    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];

        // duplicate twice, so as to newton's third law
        for (let j = 0; j < balls.length; j++) {
            if (i == j) continue;
            const other = balls[j];
            if (circCircCol(ball.pos, ball.r, other.pos, other.r)) {
                ball.collide(other);
            }
        }

        for (const obj of static) {
            const res = obj.isColliding(ball);
            if (res) {
                obj.collide(ball, res);
            }
        }
    }

    if (hole.isColliding(mainb)) {
        hole.collide(mainb, () => {
            transition.begin();
        });
    }

    hole.draw();

    for (const ball of balls) {
        ball.draw();
    }

    for (const obj of static) {
        obj.draw();
    }
    pop();

    transition.draw();
}

function mouseClicked() {
    // if (mainb.vel.mag() != 0) return;

    const vec = p5.Vector.sub(createVector(mousex, mousey), mainb.pos).div(32);
    mainb.vel = vec;

    // console.log("start", mainb.pos.x, mainb.pos.y);
    // console.log("vec", vec.x, vec.y);
}

function generateLevel() {
    const levelData = levels[level];
    mainb = new MainBall(...levelData.mainb);
    hole = new Hole(...levelData.hole);

    // todo: deep copy
    static = levelData.static;
    balls = levelData.balls;

    balls.push(mainb);
}