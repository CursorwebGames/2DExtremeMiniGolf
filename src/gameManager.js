import { genLevels } from "./levels.js";
import { Camera } from "./camera.js";
import { MainBall, Hole } from "./objects/index.js";
import { Transition } from "./transition.js";
import { circCircCol } from "./collisions.js";

export const CCD_STEPS = 2;

// todo: separation of genLevels
export class GameManager {
    /**
     * this.mainb
     * this.hole
     * this.levelBounds
     * this.camera
     * this.guideText
     */
    constructor() {
        this.balls = [];
        this.staticObjs = [];
        this.totalStrokes = 0;
        this.holeInOnes = 0;
        this.strokes = 0;
        this.scene = "game";
    }

    /**
     * Game mode specific details (levels, or editor?)
     */
    init() {
        this.levels = genLevels();
        this.level = 18;

        // this.transition = new Transition(() => {
        //     this.scene = "game";
        this.transition = new Transition(() => {
            if (this.strokes == 1) {
                this.holeInOnes++;
            }

            this.level++;
            if (this.level >= this.levels.length) {
                this.scene = "end";
                return;
            }

            this.generateLevel();
        });
        // });
    }

    // defines: camera, levelBounds, mainb, hole
    generateLevel() {
        const levelData = this.levels[this.level];

        this.strokes = 0;
        this.par = levelData.par;

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
        this.guideText = levelData.text;
        this.guideOpacity = 255;

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

    drawMenu() {
        background(123, 255, 123);

        push();
        textSize(100);
        textAlign(CENTER);
        textStyle(BOLD);
        fill(255, 132, 43);
        strokeWeight(16);
        stroke(191, 0, 0);
        text("G0lfm@n1a", width / 2, 100);

        strokeWeight(8);
        stroke(191, 150, 0);
        if (sqrt((mouseX - width / 2) ** 2 + (mouseY - height / 2) ** 2) < 100) {
            fill(255, 240, 79);
        } else {
            fill(255, 217, 0);
        }
        circle(width / 2, height / 2, 200, 200);
        fill(191, 150, 0);
        noStroke();
        triangle(width / 2 - 30, height / 2 - 30 - 16, width / 2 - 30, height / 2 + 30 + 16, width / 2 + 30 + 16, height / 2);
        pop();

        this.transition.draw();
    }

    drawEnd() {
        background(123, 255, 123);

        textSize(80);
        textStyle(NORMAL);
        textAlign(CENTER);
        fill(39, 58, 227);
        strokeWeight(4);
        stroke(17, 33, 171);
        text("You beat the game!", width / 2, 100);

        textSize(30);
        fill(237, 153, 57);
        stroke(189, 121, 43);
        text("Thanks for playing!\nCredits: Coder100", width / 2, 500);

        strokeWeight(8);
        stroke(191, 150, 0);
        fill(255, 240, 79);
        rect(width / 2 - 300, height / 2 - 100, 600, 160);//500);

        fill(201, 167, 64);
        textSize(50);
        textStyle(BOLD);
        textAlign(LEFT);
        noStroke();
        text("STATS", width / 2 - 300 + 16, height / 2 - 100 + 16 + 40);

        textSize(25);
        textStyle(NORMAL);
        text(`Total strokes: ${this.totalStrokes}
Hole in ones: ${this.holeInOnes}`, width / 2 - 300 + 16, height / 2 - 100 + 16 + 80);
        // we'll add more but i just want to finish the game
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

        push();
        fill(255);
        stroke(1);
        strokeWeight(3);
        textAlign(CENTER);
        textSize(30);
        text(this.guideText, width / 2, 50);

        textAlign(LEFT);
        textSize(20);
        text(`Stroke: ${this.strokes}\nPar: ${this.par}`, 10, height - 60);
        pop();

        this.transition.draw();
    }
}
