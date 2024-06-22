import { Water } from "../../src/objects";
import { Knot } from "./knot";

/**
 * Components that require multiple knots
 */
export class Polygon {
    constructor(obj) {
        this.obj = obj;
        this.knots = [
            new Knot(width / 2 - 50, height / 2, this),
            new Knot(width / 2 + 50, height / 2, this),
            new Knot(width / 2, height / 2 + 50, this),
        ];
        this.centerKnot = new Knot(0, 0, this);
        main.staticKnots.push(...this.knots, this.centerKnot);
        this.update();
    }

    draw() {
        this.obj.draw();
        for (const knot of this.knots) {
            knot.draw();
        }
        this.centerKnot.draw();
    }

    convertKnots() {
        return this.knots.map(knot => [knot.pos.x, knot.pos.y]);
    }

    update(knot, dpos) {
        if (knot == this.centerKnot) {
            for (const knot of this.knots) {
                knot.pos.add(dpos);
            }
        } else {
            let cx = 0, cy = 0;
            for (const knot of this.knots) {
                cx += knot.pos.x;
                cy += knot.pos.y;
            }

            cx /= this.knots.length;
            cy /= this.knots.length;

            this.centerKnot.pos = createVector(cx, cy);
        }

        if (this.obj instanceof Water) {
            const cx = this.centerKnot.pos.x;
            const cy = this.centerKnot.pos.y
            this.obj.cx = cx;
            this.obj.cy = cy;

            const render = [];
            for (const knot of this.knots) {
                render.push([knot.pos.x - cx, knot.pos.y - cy]);
            }
            this.obj.render = render;
        }

        this.obj.points = this.convertKnots();
    }
}