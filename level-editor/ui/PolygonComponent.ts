import { EditorScene } from "../scenes/editorScene";
import { Knot } from "./knot";
import { UIComponent } from "./UIComponent";

export abstract class PolygonComponent implements UIComponent {
    /** Knot registration */
    editor: EditorScene;

    /** vertex knots */
    vknots: Knot[];

    constructor(editor: EditorScene, points: PointArr = []) {
        this.editor = editor;

        this.vknots = [];

        for (const [x, y] of points) {
            this.vknots.push(new Knot(x, y));
        }

        editor.registerKnots(this, ...this.vknots);
    }

    abstract draw(): void;
    abstract update(knot: Knot, dpos: p5.Vector): void;

    /**
     * Handles when a new point has been added in polygon edit mode.
     * You can also use it to handle general knot dragging updates.
     */
    protected abstract updatePolygon(shouldCalcCenter: boolean): void;

    addPoint(x: number, y: number) {
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

    removePoint() {
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

    /**
     * Convert knots (object) into PointArr (`[number, number][]`)
     */
    protected convertKnots(): PointArr {
        return this.vknots.map(knot => [knot.pos.x, knot.pos.y]);
    }
}