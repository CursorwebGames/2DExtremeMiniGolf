import { Knot } from "./knot";

export class ConstrainedKnot extends Knot {
    constructor(x, y, parent, originKnot, axis) {
        super(x, y, parent);
        this.originKnot = originKnot;
        this.axis = axis;
    }

    // todo: what is this :cry:
    _update(pos) {
        const vec = p5.Vector.sub(pos, this.originKnot.pos);

        const projPoint = p5.Vector.setMag(this.axis, vec.dot(this.axis) / this.axis.mag()).add(this.originKnot.pos);

        this.pos = projPoint;
    }

    update() {
        this._update(this.pos);
        this.prevPos = this.pos.copy();

        if (this.selected) {
            this._update(mousePos);
            this.parent.update(this, p5.Vector.sub(this.pos, this.prevPos));
        }
    }
}