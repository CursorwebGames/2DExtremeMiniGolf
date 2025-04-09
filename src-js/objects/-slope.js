import { circRectCol } from "../collisions";

export class Slope {
    constructor(x, y, w, h, force) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.force = force.mult(0.35);
    }

    draw() {
        fill(255, 255, 255, 125);
        rect(this.x, this.y, this.w, this.h);

        fill(255);
        let cx = this.x + this.w / 2;
        let cy = this.y + this.h / 2;

        push();
        translate(cx, cy);
        rotate(this.force.heading());
        triangle(-5, -10, 5, 0, -5, 10);
        pop();
    }

    isColliding(obj) {
        return circRectCol(obj.pos.x, obj.pos.y, obj.r, this.x, this.y, this.w, this.h);
    }

    collide(obj) {
        obj.applyForce(this.force);
    }
}