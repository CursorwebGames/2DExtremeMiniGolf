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
        // return;
        if (knot == this.centerKnot) {
            for (const knot of this.vknots) {
                knot.pos.add(dpos);
            }
        } else {
            this.calcCenter();
        }

        if (this.obj instanceof Water) {
            const cx = this.centerKnot.pos.x;
            const cy = this.centerKnot.pos.y
            this.obj.cx = cx;
            this.obj.cy = cy;

            const render: PointArr = [];
            for (const knot of this.vknots) {
                render.push([knot.pos.x - cx, knot.pos.y - cy]);
            }
            this.obj.render = render;
        }

        this.obj.points = this.convertKnots();
        // throw new Error("Method not implemented.");
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