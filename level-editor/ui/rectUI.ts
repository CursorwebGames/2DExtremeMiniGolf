import { StaticObjData } from "../../src/levels/levels";
import { Ice } from "../../src/objects/ice";
import { Slope } from "../../src/objects/slope";
import { Wall } from "../../src/objects/wall";
import { EditorScene } from "../scenes/editorScene";
import { Knot } from "./knot";
import { objToName } from "./objToName";
import { UIComponent, UISerializable } from "./UIComponent";

type RectUIObj = Wall | Ice | Slope;

// TODO: turn everything positive at the end
export class RectUI implements UIComponent, UISerializable {
    obj: RectUIObj;

    posKnot: Knot;
    /** Determines the width and height */
    dimKnot: Knot;
    centerKnot: Knot;

    constructor(obj: RectUIObj, editor: EditorScene) {
        this.obj = obj;

        this.posKnot = new Knot(this.obj.x, this.obj.y);
        this.dimKnot = new Knot(this.obj.x + this.obj.w, this.obj.y + this.obj.h);
        this.centerKnot = new Knot(this.obj.x + this.obj.w / 2, this.obj.y + this.obj.h / 2);

        editor.registerKnots(this, this.posKnot, this.dimKnot, this.centerKnot);
    }

    draw(): void {
        this.obj.draw();

        this.posKnot.draw();
        this.dimKnot.draw();
        this.centerKnot.draw();
    }

    update(knot: Knot): void {
        if (knot == this.posKnot) {
            this.obj.x = this.posKnot.pos.x;
            this.obj.y = this.posKnot.pos.y;
        } else if (knot == this.centerKnot) {
            this.obj.x = this.centerKnot.pos.x - this.obj.w / 2;
            this.obj.y = this.centerKnot.pos.y - this.obj.h / 2;

            this.posKnot.pos = createVector(this.obj.x, this.obj.y);
            this.dimKnot.pos = createVector(this.obj.x + this.obj.w, this.obj.y + this.obj.h)
            return;
        }

        // knot == posKnot || knot == dimKnot
        const size = p5.Vector.sub(this.dimKnot.pos, this.posKnot.pos);
        this.obj.w = size.x;
        this.obj.h = size.y;
        this.centerKnot.pos = createVector(this.obj.x + this.obj.w / 2, this.obj.y + this.obj.h / 2);
    }

    toJSON(): StaticObjData {
        const name = objToName[this.obj.constructor.name];
        const pos = this.posKnot.pos;

        const width = this.dimKnot.pos.x - pos.x;
        const height = this.dimKnot.pos.y - pos.y;

        return [name, [pos.x, pos.y, width, height]];
    }
}