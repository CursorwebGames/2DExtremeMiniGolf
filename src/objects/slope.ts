import { circRectCol } from "../collisions";
import { Ball } from "./ball";
import { Obstacle } from "./obstacle";

export class Slope implements Obstacle {
    x: number;
    y: number;
    w: number;
    h: number;
    force: p5.Vector;

    /**
     * @param force Should be of magnitude 1 e.g. `<0, 1>`
     */
    constructor(x: number, y: number, w: number, h: number, force: p5.Vector) {
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

    isColliding(obj: Ball) {
        return circRectCol(obj.pos.x, obj.pos.y, obj.r, this.x, this.y, this.w, this.h);
    }

    collide(obj: Ball) {
        obj.applyForce(this.force);
    }
}