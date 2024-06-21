// todo: between-frame calculations to truly determine what collide first etc
// todo: angle on ball collisions
// for walls

import p5 from "p5";
window.p5 = p5;

import { genLevels } from "./levels.js";
import { Camera } from "./camera.js";
import { MainBall, Hole } from "./objects/index.js";
import { Transition } from "./transition.js";

const CCD_STEPS = 2;

class GameManager {
    init() {
        this.levels = genLevels();
        this.level = 0;

        this.balls = [];
        this.staticObjs = [];

        this.transition = new Transition();

        // camera
        // levelBounds

        // mainb, hole
        this.generateLevel();
    }

    generateLevel() {
        const levelData = this.levels[this.level];
        let bounds = levelData.bounds;
        if (!bounds) {
            bounds = [[0, 0], [width, 0], [width, height], [0, height]];
        }

        this.mainb = new MainBall(...levelData.mainb);
        this.hole = new Hole(...levelData.hole);

        // todo: deep copy
        this.staticObjs = levelData.static;
        this.balls = levelData.balls;
        this.levelBounds = bounds;

        let minx = bounds[0][0], miny = bounds[0][1], maxx = bounds[0][0], maxy = bounds[0][1];

        for (let i = 1; i < bounds.length; i++) {
            let [x, y] = bounds[i];
            if (x < minx) minx = x;
            if (y < miny) miny = y;
            if (x > maxx) maxx = x;
            if (y > maxy) maxy = y;
        }

        this.camera = new Camera(minx, miny, maxx, maxy);

        this.balls.push(this.mainb);
    }
}

// do this because
// the downsides of vite glitches just aren't worth it
window.main = new GameManager();

window.setup = function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();

    main.init();
}

window.draw = function draw() {
    background(123, 255, 123);

    push();
    main.camera.draw();

    push();
    noFill();
    strokeWeight(1);
    stroke(255);
    beginShape();
    for (const [x, y] of main.levelBounds) {
        vertex(x, y);
    }
    endShape(CLOSE);
    pop();

    for (let c = 0; c < CCD_STEPS; c++) {
        for (let i = 0; i < main.balls.length; i++) {
            const ball = main.balls[i];
            ball.update(CCD_STEPS);

            // duplicate twice, so as to newton's third law
            for (let j = 0; j < main.balls.length; j++) {
                if (i == j) continue;
                const other = main.balls[j];
                if (circCircCol(ball.pos, ball.r, other.pos, other.r)) {
                    ball.collide(other);
                }
            }

            for (const obj of main.staticObjs) {
                const res = obj.isColliding(ball);
                if (res) {
                    obj.collide(ball, res);
                }
            }
        }
    }

    if (main.hole.isColliding(main.mainb)) {
        main.hole.collide(main.mainb, () => {
            main.transition.begin();
        });
    }

    for (const obj of main.staticObjs) {
        obj.draw();
    }

    main.hole.draw();

    for (const ball of main.balls) {
        ball.draw();
    }

    pop();

    main.transition.draw();
}

window.mouseClicked = function mouseClicked() {
    // if (mainb.vel.mag() != 0) return;

    const vec = p5.Vector.sub(createVector(mousex, mousey), main.mainb.pos).div(32);
    main.mainb.vel = vec;

    // console.log("start", mainb.pos.x, mainb.pos.y);
    // console.log("vec", vec.x, vec.y);
}