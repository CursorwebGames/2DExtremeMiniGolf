import { MAX_SPEED } from "../../config";
import { MainBall } from "../mainBall";
// import { Ball } from "../ball";
import { BallEffect } from "./ballEffect";

export class SinkEffect extends BallEffect {
    id = "sink";
    prev1: PointArr;
    prev2: PointArr;

    constructor(ball: MainBall) {
        super(ball);
        this.prev1 = [];
        this.prev2 = [];
    }

    draw(): void {
        const ball = this.ball;

        const vel = ball.vel.mag();
        const opacity = ((vel / MAX_SPEED)) * 255 + 50;
        const size = ((vel / MAX_SPEED)) * 0.5 + 0.5;

        push();
        translate(ball.pos.x, ball.pos.y);
        scale(size);
        fill(255, opacity);
        strokeWeight(1);
        stroke(0, 0.25 * opacity);
        circle(0, 0, ball.r * 2);
        pop();

        const velNormal = (p5.Vector.rotate(ball.vel, 90) as unknown as p5.Vector).setMag(ball.r * size);

        this.prev1.push([ball.pos.x + velNormal.x, ball.pos.y + velNormal.y]);
        this.prev2.push([ball.pos.x - velNormal.x, ball.pos.y - velNormal.y]);

        push();
        noFill();
        strokeWeight(1);
        stroke(255, 0.5 * 255);
        beginShape();
        for (const [x, y] of this.prev1) {
            vertex(x, y);
        }
        endShape();
        beginShape();
        for (const [x, y] of this.prev2) {
            vertex(x, y);
        }
        endShape();
        pop();

        if (this.ball.vel.mag() == 0) {
            this.ball.pos = this.ball.strokeStartPos.copy();
            this.ball.effect = null;
        }
    }
}