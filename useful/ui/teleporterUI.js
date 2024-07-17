import { Knot } from "./knot";
import { nameMap } from "./nameMap";

export class TeleporterUI {
    constructor(obj) {
        this.obj = obj;
        this.startKnot = new Knot(obj.start.x, obj.start.y, this);
        this.endKnot = new Knot(obj.end.x, obj.end.y, this);
        main.staticKnots.push(this.startKnot, this.endKnot);
    }

    draw() {
        this.obj.draw();
        this.startKnot.draw();
        this.endKnot.draw();
    }

    update() {
        this.obj.start = this.startKnot.pos;
        this.obj.end = this.endKnot.pos;
    }

    export() {
        return `new ${nameMap[this.obj.constructor]}(${this.startKnot}, ${this.endKnot})`;
    }
}