import { Teleporter } from "../../src/objects/teleporter";
import { EditorScene } from "../scenes/editorScene";
import { Knot } from "./knot";
import { UIComponent } from "./UIComponent";

export class TeleporterUI implements UIComponent {
    obj: Teleporter;

    startKnot: Knot;
    endKnot: Knot;

    constructor(obj: Teleporter, editor: EditorScene) {
        this.obj = obj;
        this.startKnot = new Knot(obj.start.x, obj.start.y);
        this.endKnot = new Knot(obj.end.x, obj.end.y);
        editor.registerKnots(this, this.startKnot, this.endKnot);
    }

    draw(): void {
        this.obj.draw();
        this.startKnot.draw();
        this.endKnot.draw();
    }

    update(knot: Knot): void {
        if (knot == this.startKnot) this.obj.start = knot.pos.copy();
        if (knot == this.endKnot) this.obj.end = knot.pos.copy();
    }
}