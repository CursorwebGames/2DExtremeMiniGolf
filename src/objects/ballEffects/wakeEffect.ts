import { Ball } from "../ball";
import { BallEffect } from "./ballEffect";

export class WakeEffect extends BallEffect {
    id = "wake";
    initPos: p5.Vector;

    constructor(ball: Ball) {
        super();
        this.initPos = ball.pos.copy();
    }

    draw(ball: Ball): void {
        push();
        strokeWeight(3);
        stroke(255);
        const dir = p5.Vector.sub(this.initPos, ball.pos).normalize().mult(30);
        line(ball.pos.x, ball.pos.y, ball.pos.x + dir.x, ball.pos.y + dir.y);
        pop();
    }
}