import { Camera } from "../camera";
import { CCD_STEPS } from "../config";
import { GameManager } from "../gameManager";
import { Level } from "../levels/levels";
import { Hole } from "../objects/hole";
import { MainBall } from "../objects/mainBall";
import { Obstacle } from "../objects/obstacle";
import { Scene } from "./scene";

// TODO: MAKE A LEVEL WITH MULTIPLE BALLS OR JUST GIVE UP WITH THAT IDEA
export class GameScene extends Scene {
    camera: Camera;
    ball: MainBall;
    hole: Hole;
    bounds: PointArr;
    staticObjs: Obstacle[];

    constructor(gameManager: GameManager, level: Level) {
        super(gameManager);

        this.ball = new MainBall(...level.ball);
        this.hole = new Hole(...level.hole);

        const bounds = level.bounds;
        this.bounds = bounds;

        this.staticObjs = [];
        // this.staticObjs = level.staticObjs;

        let minx = bounds[0][0], miny = bounds[0][1], maxx = bounds[0][0], maxy = bounds[0][1];
        for (let i = 1; i < bounds.length; i++) {
            let [x, y] = bounds[i];
            if (x < minx) minx = x;
            if (y < miny) miny = y;
            if (x > maxx) maxx = x;
            if (y > maxy) maxy = y;
        }
        this.camera = new Camera(this.ball, minx, miny, maxx, maxy);
    }

    draw() {
        background(123, 255, 123);

        push();
        this.camera.draw();

        // BORDERS
        push();
        fill(94, 230, 83);
        strokeWeight(3);
        stroke(255);
        beginShape();
        for (const [x, y] of this.bounds) {
            vertex(x, y);
        }
        endShape(CLOSE);
        pop();

        this.hole.draw();
        this.ball.draw();
        pop();

        this.checkCollisions();

        // HUD
        push();
        fill(255);
        stroke(1);
        strokeWeight(3);
        textAlign(LEFT);
        textSize(20);
        text(`Stroke: ${this.gameManager.strokes}`, 10, height - 60);
        pop();
    }

    checkCollisions() {
        for (let c = 0; c < CCD_STEPS; c++) {
            this.ball.update(this.bounds, CCD_STEPS);

            for (const obj of this.staticObjs) {
                // we do it this way so implementation code for collide is less repetitive
                const res = obj.isColliding(this.ball);
                if (res) {
                    obj.collide(this.ball, res);
                }
            }
        }

        this.hole.checkBall(this.ball, () => {
            console.log('hit!');
        });
    }

    mousePressed(): void {
        if (this.ball.inHole || this.ball.vel.mag() != 0) return;
        this.ball.dragStart = createVector(mouseX, mouseY);
    }

    mouseReleased(): void {
        if (!this.ball.dragStart) return;

        const vec = this.ball.getDir().div(30);
        this.ball.dragStart = null;

        if (this.ball.vel.mag() != 0) return;
        this.ball.vel = vec;

        this.gameManager.addStroke();
    }
}
