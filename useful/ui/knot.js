export class Knot {
    constructor(x, y, parent) {
        this.pos = createVector(x, y);
        this.r = 4;
        this.selected = false;

        this.prevPos = createVector(x, y);
        this.parent = parent;
    }

    draw() {
        this.update();

        push();
        if (this.selected || this.pos.dist(mousePos) < this.r) {
            strokeWeight(1);
            stroke(0);
            fill(0, 138, 124);
        } else {
            fill(0, 186, 168);
        }
        circle(this.pos.x, this.pos.y, this.r * 2);
        pop();
    }

    update() {
        this.prevPos = this.pos.copy();

        if (this.selected) {
            this.pos = mousePos;
            this.parent.update(this, p5.Vector.sub(this.pos, this.prevPos));
        }
    }

    check() {
        if (!mouseIsPressed && this.selected) {
            this.selected = false;
        }

        if (mouseIsPressed && !this.selected && this.pos.dist(mousePos) < this.r) {
            this.selected = true;
        }

        return this.selected;
    }
}