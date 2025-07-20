import { UIComponent } from "./UIComponent";

export class Knot {
    pos: p5.Vector;
    parent!: UIComponent;
    r: number;

    /** When the user clicks on a knot, and starts dragging, use `currPos - startDrag` to find the offset */
    dragStart: p5.Vector | null;
    /** `pos = startPos + offset` */
    startPos: p5.Vector | null;

    constructor(x: number, y: number) {
        this.pos = createVector(x, y);
        this.checkSnapping();
        this.r = 4;

        this.dragStart = null;
        this.startPos = null;
    }

    draw() {
        push();
        if (this.mouseOver()) {
            strokeWeight(1);
            stroke(0);
            fill(0, 138, 124);
        } else {
            fill(0, 186, 168);
        }
        circle(this.pos.x, this.pos.y, this.r * 2);
        pop();
    }

    startDrag() {
        this.dragStart = window.mousePos;
        this.startPos = this.pos.copy();
    }

    /** Handle knot update position, etc. */
    drag() {
        const deltaPos = p5.Vector.sub(window.mousePos, this.dragStart!);
        const prevPos = this.pos.copy();
        const newPos = p5.Vector.add(this.startPos!, deltaPos);

        this.pos = newPos;
        this.checkSnapping();

        this.parent.update(this, p5.Vector.sub(this.pos, prevPos));
    }

    /** Cleanup function for drag (reset variables) */
    endDrag() {
        this.dragStart = null;
        this.startPos = null;
    }

    mouseOver() {
        // Twice the radius to make things easier to select
        return this.pos.dist(window.mousePos) < this.r * 2;
    }

    private checkSnapping() {
        if (keyIsPressed) {
            if (key == "Shift") {
                this.pos = this.snap(this.pos);
                return;
            }

            if (key == "Control") {
                this.pos = this.snap(this.pos, 25);
                return;
            }
        }

        this.pos = createVector(round(this.pos.x), round(this.pos.y));
    }

    private snap(v: p5.Vector, n = 50) {
        return createVector(round(v.x / n) * n, round(v.y / n) * n);
    }
}
