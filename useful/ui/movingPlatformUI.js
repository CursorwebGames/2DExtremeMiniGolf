import { ConstrainedKnot } from "./constrainedKnot";
// import { Knot } from "./knot";
import { RectUI } from "./rectUI";

export class MovingPlatformUI extends RectUI {
    constructor(obj) {
        super(obj);

        // right, bottom
        this.deltas = [
            new ConstrainedKnot(this.obj.x + this.obj.w, this.obj.y + this.obj.h / 2, this, createVector(1, 0)),
            new ConstrainedKnot(this.obj.x + this.obj.w / 2, this.obj.y + this.obj.h, this, createVector(0, 1))
        ];

        main.staticKnots.push(...this.deltas);
    }

    update(knot, dpos) {
        super.update(knot, dpos);

        if (this.deltas.includes(knot)) {
            const dw = this.deltas[0].pos.x - this.obj.x - this.obj.w / 2;
            const dh = this.deltas[1].pos.y - this.obj.y - this.obj.h / 2;

            this.obj.dw = dw;
            this.obj.dh = dh;
        } else {
            const d0 = createVector(this.obj.x + this.obj.w / 2 + this.obj.dw, this.obj.y + this.obj.h / 2);
            const d1 = createVector(this.obj.x + this.obj.w / 2, this.obj.y + this.obj.h / 2 + this.obj.dh);
            this.deltas[0].pos = d0;
            this.deltas[0].origin = d0;

            this.deltas[1].pos = d1;
            this.deltas[1].origin = d1;
        }
    }

    draw() {
        const obj = this.obj;
        fill(0, 0, 255);
        rect(this.obj.x, this.obj.y, this.obj.w, this.obj.h);

        push();
        noFill();
        strokeWeight(1);
        stroke(255, 0, 0);
        rect(obj.x + obj.w / 2 - obj.dw, obj.y + obj.h / 2 - obj.dh, 2 * this.obj.dw, 2 * this.obj.dh);
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