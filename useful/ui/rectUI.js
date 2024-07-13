// import { ConstrainedKnot } from "./constrainedKnot";
import { Knot } from "./knot";
import { PolygonUI } from "./polygonUI";

/**
 * Two corner, one center rectangle
 */
export class RectUI extends PolygonUI {
    constructor(obj) {
        super(obj);

        this.knots = [
            new Knot(this.obj.x, this.obj.y, this),
            new Knot(this.obj.x + this.obj.w, this.obj.y + this.obj.h, this),
        ];

        main.staticKnots.push(...this.knots);

        this.update();
    }

    update(knot, dpos) {
        super.update(knot, dpos);
        this.obj.x = this.knots[0].pos.x;
        this.obj.y = this.knots[0].pos.y;
        this.obj.w = this.knots[1].pos.x - this.obj.x;
        this.obj.h = this.knots[1].pos.y - this.obj.y;
    }
}