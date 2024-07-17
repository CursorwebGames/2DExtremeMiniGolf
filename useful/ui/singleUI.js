import { Knot } from "./knot";
import { nameMap } from "./nameMap";

/**
 * Components that require only a single knot
 * @param isStatic whether it's a static object, so knots should add to the static knot pool for event checking (i.e. mainball or not)
 */
export class SingleUI {
    constructor(obj, isStatic = true) {
        this.obj = obj;
        this.knot = new Knot(obj.pos.x, obj.pos.y, this);
        if (isStatic) {
            main.staticKnots.push(this.knot);
        }
    }

    draw() {
        this.obj.draw();
        this.knot.draw();
    }

    update() {
        this.obj.pos = this.knot.pos.copy();
    }

    export() {
        return `new ${nameMap[this.obj.constructor]}(${this.knot})`;
    }
}