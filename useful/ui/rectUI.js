import { ConstrainedKnot } from "./constrainedKnot";
import { Knot } from "./knot";

/**
 * Three knots rectangle
 */
export class RectUI {
    constructor(obj) {
        this.obj = obj;

        this.posKnot = new Knot(this.obj.x, this.obj.y, this);
        this.widthKnot = new ConstrainedKnot(this.obj.x + this.obj.w, this.obj.y, this, this.posKnot, createVector(1, 0));
        this.heightKnot = new ConstrainedKnot(this.obj.x, this.obj.y + this.obj.h, this, this.posKnot, createVector(0, 1));

        main.staticKnots.push(this.posKnot, this.widthKnot, this.heightKnot);
    }

    draw() {
        this.obj.draw();
        this.posKnot.draw();
        this.widthKnot.draw();
        this.heightKnot.draw();
    }

    update(knot, delta) {
        if (knot == this.posKnot) {
            this.widthKnot.originUpdate(delta);
            this.heightKnot.originUpdate(delta);
        }
        const pos = this.posKnot.pos;
        this.obj.x = pos.x;
        this.obj.y = pos.y;
        this.obj.w = this.widthKnot.pos.x - pos.x;
        this.obj.h = this.heightKnot.pos.y - pos.y;
    }
}