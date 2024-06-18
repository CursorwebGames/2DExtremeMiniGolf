// todo: between-frame calculations to truly determine what collide first etc
// todo: angle on ball collisions
// for walls
import p5 from "p5";
window.p5 = p5;

import "./collisions";
import { genLevels } from "./levels";
// import { MainBall } from "./objects/mainball";
// import { Hole } from "./objects/hole";
import { Camera } from "./camera";
import { Transition, generateLevel } from "./transition";

// window.levels = null;
// let balls = [];
// let staticObjs = [];
// let mainb;
// window.hole;

let camera, transition;


window.setup = function setup() {
    createCanvas(windowWidth, windowHeight);

    noStroke();
    window.levels = genLevels();

    generateLevel();

    camera = new Camera(0, 0, width, height);
    transition = new Transition();
}

window.draw = function draw() {
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

        for (const obj of staticObjs) {
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

    for (const obj of staticObjs) {
        obj.draw();
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
