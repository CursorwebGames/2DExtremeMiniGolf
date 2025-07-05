import { PolygonWall } from "../../src/objects/polygonWall";
import { Sand } from "../../src/objects/sand";
import { Water } from "../../src/objects/water";
import { EditorScene } from "../scenes/editorScene";
import { Knot } from "./knot";
import { PolygonComponent } from "./PolygonComponent";
import { UIComponent } from "./UIComponent";

type PolygonUIObj = PolygonWall | Water | Sand;

export class PolygonUI implements UIComponent, PolygonComponent {
    obj: PolygonUIObj;
    /** Knot registration */
    editor: EditorScene;

    /** vertex knots */
    vknots: Knot[];
    centerKnot: Knot;

    constructor(obj: PolygonUIObj, editor: EditorScene) {
        this.obj = obj;

        // temp code
        this.vknots = [];
        this.centerKnot = new Knot(0, 0);
        for (const [x, y] of obj.points) {
            this.vknots.push(new Knot(x, y));
        }
        this.calcCenter();
        editor.registerKnots(this, ...this.vknots, this.centerKnot);

        this.editor = editor;
    }

    draw(): void {
        this.obj.draw();

        for (const knot of this.vknots) {
            knot.draw();
        }

        this.centerKnot.draw();
    }

    update(knot: Knot, dpos: p5.Vector): void {
        if (knot == this.centerKnot) {
            for (const knot of this.vknots) {
                knot.pos.add(dpos);
            }
        } else {
            this.calcCenter();
        }

        this.updatePolygon(false);
    }

    private updatePolygon(calcCenter: boolean) {
        if (calcCenter) {
            this.calcCenter();
        }

        if (this.obj instanceof Water) {
            const cx = this.centerKnot.pos.x;
            const cy = this.centerKnot.pos.y;
            this.obj.cx = cx;
            this.obj.cy = cy;

            const render: PointArr = [];
            for (const knot of this.vknots) {
                render.push([knot.pos.x - cx, knot.pos.y - cy]);
            }
            this.obj.render = render;
        }

        this.obj.points = this.convertKnots();
    }

    addPoint(x: number, y: number): void {
        const knot = new Knot(x, y);

        const knots = this.vknots;

        // you need 3 knots to make a triangle and a center
        if (knots.length < 2) {
            knots.push(knot);
        } else {
            let minDist = Infinity;
            let idx = 0;

            const pos = knot.pos;
            for (let i = 0; i < knots.length; i++) {
                const left = knots[i].pos;
                const right = knots[(i + 1) % knots.length].pos;

                // project the point onto each edge of the polygon
                const pointVec = p5.Vector.sub(pos, left);
                const lineVec = p5.Vector.sub(right, left);

                const projPoint = lineVec.setMag(pointVec.dot(lineVec) / lineVec.mag()).add(left);
                const dist = projPoint.dist(pos);

                if (projPoint.dist(left) + projPoint.dist(right) >= left.dist(right) + 5) {
                    continue;
                }

                // the point to insert is between the edge that is closest to the point
                // which is calculated based on projection and actual
                if (dist < minDist) {
                    idx = i + 1;
                    minDist = dist;
                }
            }

            knots.splice(idx, 0, knot);
        }

        this.editor.registerKnots(this, knot);
        this.updatePolygon(true);
    }

    removePoint(): void {
        for (let i = this.vknots.length - 1; i >= 0; i--) {
            const knot = this.vknots[i];
            if (knot.mouseOver()) {
                this.vknots.splice(i, 1);
                this.editor.deregisterKnot(knot);
                this.updatePolygon(true);
                break;
            }
        }
    }

    private convertKnots(): PointArr {
        return this.vknots.map(knot => [knot.pos.x, knot.pos.y]);
    }

    private calcCenter() {
        let cx = 0, cy = 0;
        for (const knot of this.vknots) {
            cx += knot.pos.x;
            cy += knot.pos.y;
        }

        cx /= this.vknots.length;
        cy /= this.vknots.length;

        this.centerKnot.pos = createVector(cx, cy);
    }
}