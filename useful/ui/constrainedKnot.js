import { Knot } from "./knot";

export class ConstrainedKnot extends Knot {
    constructor(x, y, parent, axis) {
        super(x, y, parent);
        this.origin = createVector(x, y);
        this.axis = axis;
    }

    originUpdate(delta) {
        this.pos.add(delta);
    }

    update() {
        this.prevPos = this.pos.copy();

        if (this.selected) {
            const pos = mousePos;
            const vec = p5.Vector.sub(pos, this.origin);

            const projPoint = p5.Vector.setMag(this.axis, vec.dot(this.axis) / this.axis.mag()).add(this.origin);

            this.pos = projPoint;
            this.parent.update(this, p5.Vector.sub(this.pos, this.prevPos));
        }
    }
}