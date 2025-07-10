import { circRectCol } from "../collisions";
import { Ball } from "./ball";
import { Obstacle } from "./obstacle";

// how many rectangles to draw
const gradientDetail = 10;

export class Slope implements Obstacle {
    x: number;
    y: number;
    w: number;
    h: number;
    force: p5.Vector;
    colors: p5.Color[];

    /**
     * @param force Should be of magnitude 1 e.g. `<0, 1>` (unless you want it really strong). Also should be at 90 degrees
     */
    constructor(x: number, y: number, w: number, h: number, force: [number, number]) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.force = createVector(...force).mult(0.35);

        this.colors = [];
        const white = color(100, 0.1 * 255);
        const black = color(100, 0.5 * 255);
        for (let i = 0; i < gradientDetail; i++) {
            this.colors.push(lerpColor(white, black, i / gradientDetail));
        }
    }

    draw() {
        const ang = this.force.heading();

        push();
        noFill();
        // fill(255, 0, 0)
        strokeWeight(0.1);
        stroke(0);
        rect(this.x, this.y, this.w, this.h);
        pop();

        let cx = this.x + this.w / 2;
        let cy = this.y + this.h / 2;

        push();
        fill(255);
        translate(cx, cy);
        this.drawGradient(ang);

        // positive X = 0 degrees
        rotate(ang);
        triangle(-5, -10, 5, 0, -5, 10);
        pop();

    }

    /** You must translate by `cx, cy` before calling this function! */
    drawGradient(ang: number) {
        // translate(cx, cy);
        push();
        // TODO: figure out how tf this works (skewing??)
        scale(this.w, this.h);
        rotate(ang);
        const widthIncrement = 1 / gradientDetail;
        for (let i = 0; i < gradientDetail; i++) {
            fill(this.colors[i]);
            // 0.01 / gradientDetail <-- this is for rounding errors
            rect(-0.5 + widthIncrement * i, -0.5, widthIncrement, 1);
        }
        pop();
    }

    isColliding(obj: Ball) {
        return circRectCol(obj.pos.x, obj.pos.y, obj.r, this.x, this.y, this.w, this.h);
    }

    collide(obj: Ball) {
        obj.applyForce(this.force);
    }
}