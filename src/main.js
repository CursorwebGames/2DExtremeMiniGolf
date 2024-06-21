// todo: between-frame calculations to truly determine what collide first etc
// todo: angle on ball collisions
// for walls
import p5 from "p5";
window.p5 = p5;

import { genLevels } from "./levels";
import { Camera } from "./camera";
import { MainBall, Hole } from "./objects";

const CCD_STEPS = 2;

let levels;
// let levelBounds;
let balls = [];
let staticObjs = [];
// let mainb;
let hole;

let camera, transition;

let level = 0;

window.setup = function setup() {
    createCanvas(windowWidth, windowHeight);

    noStroke();
    levels = genLevels();

    generateLevel();

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

window.draw = function draw() {
    background(123, 255, 123);

    push();
    camera.draw();

    push();
    noFill();
    strokeWeight(1);
    stroke(255);
    beginShape();
    for (const [x, y] of levelBounds) {
        vertex(x, y);
    }
    endShape(CLOSE);
    pop();

    for (let c = 0; c < CCD_STEPS; c++) {
        for (let i = 0; i < balls.length; i++) {
            const ball = balls[i];
            ball.update(CCD_STEPS);

            // duplicate twice, so as to newton's third law
            for (let j = 0; j < balls.length; j++) {
                if (i == j) continue;
                const other = balls[j];
                if (circCircCol(ball.pos, ball.r, other.pos, other.r)) {
                    ball.collide(other);
                }
            }

            for (const obj of staticObjs) {
                const res = obj.isColliding(ball);
                if (res) {
                    obj.collide(ball, res);
                }
            }
        }
    }

    if (hole.isColliding(mainb)) {
        hole.collide(mainb, () => {
            transition.begin();
        });
    }

    for (const obj of staticObjs) {
        obj.draw();
    }

    hole.draw();

    for (const ball of balls) {
        ball.draw();
    }

    pop();

    transition.draw();
}

window.mouseClicked = function mouseClicked() {
    // if (mainb.vel.mag() != 0) return;

    const vec = p5.Vector.sub(createVector(mousex, mousey), mainb.pos).div(32);
    mainb.vel = vec;

    // console.log("start", mainb.pos.x, mainb.pos.y);
    // console.log("vec", vec.x, vec.y);
}

function generateLevel() {
    const levelData = levels[level];
    let bounds = levelData.bounds;
    if (!bounds) {
        bounds = [[0, 0], [width, 0], [width, height], [0, height]];
    }
    window.mainb = new MainBall(...levelData.mainb);
    hole = new Hole(...levelData.hole);

    // todo: deep copy
    staticObjs = levelData.static;
    balls = levelData.balls;
    window.levelBounds = bounds;

    let minx = bounds[0][0], miny = bounds[0][1], maxx = bounds[0][0], maxy = bounds[0][1];

    for (let i = 1; i < bounds.length; i++) {
        let [x, y] = bounds[i];
        if (x < minx) minx = x;
        if (y < miny) miny = y;
        if (x > maxx) maxx = x;
        if (y > maxy) maxy = y;
    }

    camera = new Camera(minx, miny, maxx, maxy);

    balls.push(mainb);
}