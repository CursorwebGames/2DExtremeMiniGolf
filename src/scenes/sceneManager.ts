import { Camera } from "../camera";
import { CCD_STEPS } from "../config";
import { Ball } from "../objects/ball";
import { Scene } from "./scene";

class MainScene implements Scene {
    camera: Camera;
    ball: Ball;

    constructor() {
        this.camera = new Camera(0, 0, width, height);
        this.ball = new Ball(width / 2, height / 2, 10);
    }

    draw(): void {
        background(123, 255, 123);

        push();
        this.camera.update(this.ball);

        // Bounds
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

        // HUD
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