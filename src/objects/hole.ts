import { circCircCol } from "../collisions";
import { MainBall } from "./mainBall";

export class Hole {
    pos: p5.Vector;
    r: number;

    constructor(x: number, y: number) {
        this.pos = createVector(x, y);
        this.r = 12;
    }

    draw() {
        fill(0);
        circle(this.pos.x, this.pos.y, this.r * 2);
    }

    // TODO: put this under CCD?
    /**
     * Slow the ball down before passing callback (when the magnitude is low enough)
     */
    checkBall(ball: MainBall, callback: () => void) {
        if (circCircCol(ball.pos, ball.r, this.pos, this.r)) {
            if (ball.vel.mag() < 0.001 && !ball.inHole) {
                callback();
                ball.inHole = true;
            }

            // slow ball down
            ball.vel.mult(0.9);
            let dir = p5.Vector.sub(this.pos, ball.pos);

            ball.applyForce(dir.setMag(this.pos.dist(ball.pos) * 0.1));
        }
    }
}