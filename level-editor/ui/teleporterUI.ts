import { StaticObjData } from "../../src/levels/levels";
import { Teleporter } from "../../src/objects/teleporter";
import { EditorScene } from "../scenes/editorScene";
import { Knot } from "./knot";
import { nameMap } from "./nameMap";
import { UIComponent, UISerializable } from "./UIComponent";

export class TeleporterUI implements UIComponent, UISerializable {
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

    toJSON(): StaticObjData {
        const name = nameMap[this.obj.constructor.name];
        const start = this.startKnot.pos;
        const end = this.endKnot.pos;

        return [name, [start.x, start.y, end.x, end.y]];
    }
}