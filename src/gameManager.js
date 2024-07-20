import { genLevels } from "./levels.js";
import { Camera } from "./camera.js";
import { MainBall, Hole } from "./objects/index.js";
import { Transition } from "./transition.js";

export const CCD_STEPS = 2;

// todo: separation of genLevels
export class GameManager {
    /**
     * this.mainb
     * this.hole
     * this.levelBounds
     * this.camera
     */
    constructor() {
        this.balls = [];
        this.staticObjs = [];
    }

    /**
     * Game mode specific details (levels, or editor?)
     */
    init() {
        this.levels = genLevels();
        this.level = 0;

        this.transition = new Transition(() => {
            this.level++;
            this.generateLevel();
        });
    }

    // defines: camera, levelBounds, mainb, hole
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

    draw() {
        background(123, 255, 123);

        push();
        this.camera.draw();

        push();
        fill(94, 230, 83);
        strokeWeight(3);
        stroke(255);
        beginShape();
        for (const [x, y] of this.levelBounds) {
            vertex(x, y);
        }
        endShape(CLOSE);
        pop();

        for (let c = 0; c < CCD_STEPS; c++) {
            for (let i = 0; i < this.balls.length; i++) {
                const ball = this.balls[i];
                ball.update(CCD_STEPS);

                // duplicate twice, so as to newton's third law
                for (let j = 0; j < this.balls.length; j++) {
                    if (i == j) continue;
                    const other = this.balls[j];
                    if (circCircCol(ball.pos, ball.r, other.pos, other.r)) {
                        ball.collide(other);
                    }
                }

                for (const obj of this.staticObjs) {
                    const res = obj.isColliding(ball);
                    if (res) {
                        obj.collide(ball, res);
                    }
                }
            }
        }

        if (this.hole.isColliding(this.mainb)) {
            this.hole.collide(this.mainb, () => {
                this.transition.begin();
            });
        }

        for (const staticObj of this.staticObjs) {
            staticObj.draw();
        }

        this.hole.draw();

        for (const ball of this.balls) {
            ball.draw();
        }

        pop();

        this.transition.draw();
    }
}
