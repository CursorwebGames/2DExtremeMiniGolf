import { MAX_SPEED } from "../../config";
import { MainBall } from "../mainBall";
import { BallEffect } from "./ballEffect";

const maxBubbleSize = 20;
const bubbleFreq = 5;

export class SinkEffect extends BallEffect {
    id = "sink";
    trail: { x: number, y: number, tick: number }[];
    trailTick: number;

    constructor(ball: MainBall) {
        super(ball);
        this.trail = [];
        this.trailTick = 0;
    }

    draw() {
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

        this.trailTick++;
        if (this.trailTick == bubbleFreq && this.ball.vel.mag() > 1) {
            this.trailTick = 0;
            this.trail.push({ ...ball.pos, tick: 0 });
        }

        push();
        noFill();
        strokeWeight(1);
        for (let i = this.trail.length - 1; i >= 0; i--) {
            const bubble = this.trail[i];

            bubble.tick += 0.5;
            stroke(255, (1 - bubble.tick / maxBubbleSize) * 255);
            circle(bubble.x, bubble.y, bubble.tick + 10);
            if (bubble.tick >= maxBubbleSize) {
                this.trail.splice(i, 1);
            }
        }
        pop();

        if (this.ball.vel.mag() == 0 && this.trail.length == 0) {
            this.ball.pos = this.ball.strokeStartPos.copy();
            this.ball.effect = null;
        }
    }
}