import { Knot } from "./knot";

/**
 * Components that require only a single knot
 */
export class Single {
    constructor(obj, isStatic = false) {
        this.obj = obj;
        this.knot = new Knot(obj.pos.x, obj.pos.y, this);
        if (isStatic) {
            staticKnots.push(this.knot);
        }
    }

    draw() {
        this.obj.draw();
        this.knot.draw();
    }

    update() {
        this.obj.pos = this.knot.pos;
    }
}