import { MAX_SPEED } from "../../config";
import { Ball } from "../ball";
import { BallEffect } from "./ballEffect";

export class DrownEffect extends BallEffect {
    id = "drown";

    draw(ball: Ball): void {
        const vel = ball.vel.mag();
        const opacity = ((vel / MAX_SPEED)) * 255 + 50;
        const size = ((vel / MAX_SPEED)) * 0.25 + 0.75;

        push();
        translate(ball.pos.x, ball.pos.y);
        scale(size);
        fill(255, opacity);
        strokeWeight(1);
        stroke(0, 0.25 * opacity);
        circle(0, 0, ball.r * 2);
        pop();
    }
}