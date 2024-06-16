class Knot {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.r = 4;
        this.selected = false;
    }

    draw() {
        if (this.selected) {
            this.pos = mousePos;
        }

        push();
        if (this.pos.dist(mousePos) < this.r) {
            strokeWeight(1);
            stroke(0);
            fill(0, 138, 124);
        } else {
            fill(0, 186, 168);
        }
        circle(this.pos.x, this.pos.y, this.r * 2);
        pop();
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