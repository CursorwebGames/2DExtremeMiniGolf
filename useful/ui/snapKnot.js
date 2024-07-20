import { Knot } from "./knot";

export class SnapKnot extends Knot {
    constructor(x, y, parent) {
        super(snap(x), snap(y), parent);
    }

    update() {
        this.prevPos = this.pos.copy();

        if (this.selected) {
            this.pos = createVector(snap(mousePos.x), snap(mousePos.y));
            this.parent.update(this, p5.Vector.sub(this.pos, this.prevPos));
        }
    }

}

export function snap(x) {
    return round(x / 50) * 50;
}