/**
 * Components that require only a single knot
 */
class Single {
    constructor(obj) {
        this.obj = obj;
        this.knot = new Knot(obj.pos.x, obj.pos.y);
        knots.push(this.knot);
    }

    draw() {
        this.obj.draw();
        this.knot.draw();
        this.obj.pos = this.knot.pos;
    }
}