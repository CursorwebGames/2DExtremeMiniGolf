import { StaticObjData } from "../../src/levels/levels";
import { Ball } from "../../src/objects/ball";
import { Bouncer } from "../../src/objects/bouncer";
import { Hole } from "../../src/objects/hole";
import { EditorScene } from "../scenes/editorScene";
import { Knot } from "./knot";
import { nameMap } from "./nameMap";
import { UIComponent, UISerializable } from "./UIComponent";

type SingleUIObj = Ball | Hole | Bouncer;

export class SingleUI implements UIComponent, UISerializable {
    obj: SingleUIObj;
    knot: Knot;

    constructor(obj: SingleUIObj, editor: EditorScene) {
        this.obj = obj;
        this.knot = new Knot(obj.pos.x, obj.pos.y);
        editor.registerKnots(this, this.knot);
    }

    draw() {
        this.obj.draw();
        this.knot.draw();
    }

    update(knot: Knot): void {
        this.obj.pos = knot.pos.copy();
    }

    toJSON(): StaticObjData {
        const name = nameMap[this.obj.constructor.name];
        const pos = this.knot.pos;

        return [name, [pos.x, pos.y]];
    }
}