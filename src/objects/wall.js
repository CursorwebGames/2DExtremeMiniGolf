import { circRectCol } from "../collisions";

export class Wall {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw() {
        fill(217, 238, 255);
        rect(this.x, this.y, this.w, this.h);
    }

    collide(obj) {
        let cx = obj.pos.x;
        let cy = obj.pos.y;

        // apply -2 * v to the component
        // as a "bounce"
        // energy loss
        if (cx < this.x) {
            obj.vel.x *= -1;
            obj.pos.x = this.x - obj.r;
        }

        if (cx > this.x + this.w) {
            obj.vel.x *= -1;
            obj.pos.x = this.x + this.w + obj.r;
        }

        if (cy < this.y) {
            obj.vel.y *= -1;
            obj.pos.y = this.y - obj.r;
        }

        if (cy > this.y + this.h) {
            obj.vel.y *= -1;
            obj.pos.y = this.y + this.h + obj.r;
        }
    }

    isColliding(ball) {
        return circRectCol(ball.pos.x, ball.pos.y, ball.r, this.x, this.y, this.w, this.h);
    }
}
