import { StaticObjData } from "../../src/levels/levels";
import { PolygonWall } from "../../src/objects/polygonWall";
import { Sand } from "../../src/objects/sand";
import { Water } from "../../src/objects/water";
import { EditorScene } from "../scenes/editorScene";
import { Knot } from "./knot";
import { objToName } from "./UINameMap";
import { PolygonComponent } from "./PolygonComponent";
import { UISerializable } from "./UIComponent";

type PolygonUIObj = PolygonWall | Water | Sand;

export class PolygonUI extends PolygonComponent implements UISerializable {
    obj: PolygonUIObj;
    /** Knot registration */
    editor: EditorScene;

    /** vertex knots */
    vknots: Knot[];
    centerKnot: Knot;

    constructor(obj: PolygonUIObj, editor: EditorScene) {
        super(editor);
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

    protected updatePolygon(calcCenter: boolean) {
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

    toJSON(): StaticObjData {
        const name = objToName[this.obj.constructor.name];
        const points = this.convertKnots();
        return [name, [points]];
    }
}