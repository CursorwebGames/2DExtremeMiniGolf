import { Slope } from "../../src/objects";
import { Knot } from "./knot";
import { nameMap } from "./nameMap";
import { PolygonUI } from "./polygonUI";

// todo: ancestor class of both
/**
 * Two corner, one center rectangle
 */
export class RectUI extends PolygonUI {
    constructor(obj) {
        super(obj);

        // top left, top right
        this.knots = [
            new Knot(this.obj.x, this.obj.y, this),
            new Knot(this.obj.x + this.obj.w, this.obj.y + this.obj.h, this),
        ];

        main.staticKnots.push(...this.knots);

        this.calcCenter();
    }

    update(knot, dpos) {
        super.update(knot, dpos);
        this.obj.x = this.knots[0].pos.x;
        this.obj.y = this.knots[0].pos.y;
        this.obj.w = this.knots[1].pos.x - this.obj.x;
        this.obj.h = this.knots[1].pos.y - this.obj.y;
    }

    export() {
        // new (...
        let text = `new ${nameMap[this.obj.constructor]}(${round(this.obj.x)}, ${round(this.obj.y)}, ${round(this.obj.w)}, ${round(this.obj.h)}`;
        if (this.obj instanceof Slope) {
            const force = p5.Vector.normalize(this.obj.force);
            text += `, createVector(${round(force.x)}, ${round(force.y)})`
        }
        return `${text})`;
    }
}