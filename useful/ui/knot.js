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
        if (this.selected || this.pos.dist(mousePos) < this.r * 2) {
            strokeWeight(1);
            stroke(0);
            fill(0, 138, 124);
        } else {
            fill(0, 186, 168);
        }
        circle(this.pos.x, this.pos.y, this.r * 2);
        fill(0);
        text(this.l, this.pos.x, this.pos.y);
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
        // mouse released
        if (!mouseIsPressed && this.selected) {
            this.selected = false;
        }

        // mouse just clicked on it
        if (mouseIsPressed && !this.selected && this.pos.dist(mousePos) < this.r * 2) {
            this.selected = true;
        }

        // if neither happened, continue current state (unlikely)
        return this.selected;
    }
}