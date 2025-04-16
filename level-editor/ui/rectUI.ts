import { Ice } from "../../src/objects/ice";
import { Slope } from "../../src/objects/slope";
import { Wall } from "../../src/objects/wall";
import { EditorScene } from "../scenes/editorScene";
import { Knot } from "./knot";
import { UIComponent } from "./UIComponent";

type RectUIObj = Wall | Ice | Slope;

// TODO: add center knot
export class RectUI implements UIComponent {
    obj: RectUIObj;

    posKnot: Knot;
    /** Determines the dimension */
    dimKnot: Knot;

    constructor(obj: RectUIObj, editor: EditorScene) {
        this.obj = obj;

        this.posKnot = new Knot(this.obj.x, this.obj.y);
        this.dimKnot = new Knot(this.obj.x + this.obj.w, this.obj.y + this.obj.h);

        editor.registerKnots(this, this.posKnot, this.dimKnot);
    }

    draw(): void {
        this.obj.draw();

        this.posKnot.draw();
        this.dimKnot.draw();
    }

    update(knot: Knot): void {
        if (knot == this.dimKnot) {
            const size = p5.Vector.sub(this.dimKnot.pos, this.posKnot.pos);
            this.obj.w = size.x;
            this.obj.h = size.y;
        } else {
            this.obj.x = this.posKnot.pos.x;
            this.obj.y = this.posKnot.pos.y;

            const size = p5.Vector.sub(this.dimKnot.pos, this.posKnot.pos);
            this.obj.w = size.x;
            this.obj.h = size.y;
        }
    }
}