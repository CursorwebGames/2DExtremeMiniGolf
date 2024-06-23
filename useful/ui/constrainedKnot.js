import { Knot } from "./knot";

export class ConstrainedKnot extends Knot {
    constructor(x, y, parent, originKnot, axis) {
        super(x, y, parent);
        this.originKnot = originKnot;
        this.axis = axis;
    }

    // todo: before draw
    update() {
        const pos = mousePos;
        const vec = p5.Vector.sub(pos, this.originKnot.pos);

        const projPoint = p5.Vector.setMag(this.axis, vec.dot(this.axis) / this.axis.mag()).add(this.originKnot.pos);

        this.pos = projPoint;
    }
}