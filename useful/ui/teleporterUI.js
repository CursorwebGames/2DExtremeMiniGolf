import { Knot } from "./knot";

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
        return `new ${this.obj.constructor.name}(${this.obj.start.x}, ${this.obj.start.y}, ${this.obj.end.x}, ${this.obj.end.y})`;
    }
}