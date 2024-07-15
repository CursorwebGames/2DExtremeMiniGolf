import { Water } from "../../src/objects";
import { Knot } from "./knot";
import { nameMap } from "./nameMap";

/**
 * Components that require multiple knots
 */
export class PolygonUI {
    constructor(obj) {
        this.obj = obj;
        this.knots = [];
        this.centerKnot = new Knot(0, 0, this);
        main.staticKnots.push(this.centerKnot);
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

    addPoint(x, y) {
        const knot = new Knot(x, y, this);

        const knots = this.knots;

        if (knots.length < 2) {
            knots.push(knot);
        } else {
            let minDist = Infinity;
            let idx = 0;

            const pos = knot.pos;
            for (let i = 0; i < knots.length; i++) {
                const left = knots[i].pos;
                const right = knots[(i + 1) % knots.length].pos;

                const pointVec = p5.Vector.sub(pos, left);
                const lineVec = p5.Vector.sub(right, left);

                const projPoint = lineVec.setMag(pointVec.dot(lineVec) / lineVec.mag()).add(left);
                const dist = projPoint.dist(pos);

                if (projPoint.dist(left) + projPoint.dist(right) >= left.dist(right) + 5) {
                    continue;
                }

                if (dist < minDist) {
                    idx = i + 1;
                    minDist = dist;
                }
            }

            knots.splice(idx, 0, knot);
        }

        main.staticKnots.push(knot);
        this.update();
    }

    export() {
        return `new ${nameMap[this.obj.constructor]}(${JSON.stringify(this.obj.points)})`;
    }
}