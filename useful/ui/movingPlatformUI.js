import { ConstrainedKnot } from "./constrainedKnot";
// import { Knot } from "./knot";
import { RectUI } from "./rectUI";

export class MovingPlatformUI extends RectUI {
    constructor(obj) {
        super(obj);

        // right, bottom
        this.deltas = [
            new ConstrainedKnot(this.obj.x + this.obj.w, this.y + this.obj.h / 2, this, createVector(1, 0)),
            new ConstrainedKnot(this.obj.x + this.obj.w / 2, this.y + this.h, this, createVector(0, 1))
        ];

        main.staticKnots.push(...this.deltas);
    }

    update(knot, dpos) {
        super.update(knot, dpos);

        const dw = this.deltas[0].pos.x - this.obj.x - this.obj.w;
        const dh = this.deltas[1].pos.y - this.obj.y - this.obj.h;

        this.obj.dw = dw;
        this.obj.dh = dh;
    }

    draw() {
        fill(255, 0, 0)
        rect(this.obj.x, this.obj.y, this.obj.w, this.obj.h);
        push();
        noFill();
        strokeWeight(1);
        stroke(255, 0, 0);
        rect(this.obj.x - this.obj.dw, this.obj.y - this.obj.dh, this.obj.x + this.obj.dw, this.obj.y + this.obj.dh);
        pop();

        for (const knot of this.knots) {
            knot.draw();
        }

        for (const knot of this.deltas) {
            knot.draw();
        }

        this.centerKnot.draw();
    }
}