import { circRectCol } from "../collisions";
import { Ball } from "./ball";
import { Obstacle } from "./obstacle";

export class Wall implements Obstacle {
    x: number;
    y: number;
    w: number;
    h: number;

    constructor(x: number, y: number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw() {
        fill(217, 238, 255);
        rect(this.x, this.y, this.w, this.h);
    }

    collide(ball: Ball) {
        let cx = ball.pos.x;
        let cy = ball.pos.y;

        // apply -2 * v to the component as a "bounce"
        // energy loss
        if (cx < this.x) {
            ball.vel.x *= -1;
            ball.pos.x = this.x - ball.r;
        }

        if (cx > this.x + this.w) {
            ball.vel.x *= -1;
            ball.pos.x = this.x + this.w + ball.r;
        }

        if (cy < this.y) {
            ball.vel.y *= -1;
            ball.pos.y = this.y - ball.r;
        }

        if (cy > this.y + this.h) {
            ball.vel.y *= -1;
            ball.pos.y = this.y + this.h + ball.r;
        }
    }

    isColliding(ball: Ball) {
        return circRectCol(ball.pos.x, ball.pos.y, ball.r, this.x, this.y, this.w, this.h);
    }
}
