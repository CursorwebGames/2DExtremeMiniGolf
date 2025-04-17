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
        this.dragStart = createVector(mouseX, mouseY);
        this.startPos = this.pos.copy();
    }

    /** Handle knot update position, etc. */
    drag() {
        const deltaPos = createVector(mouseX, mouseY).sub(this.dragStart!);
        const pos = p5.Vector.add(this.startPos!, deltaPos);
        this.pos = pos;
        this.parent.update(this);
    }

    /** Cleanup function for drag (reset variables) */
    endDrag() {
        this.dragStart = null;
        this.startPos = null;
    }

    mouseOver() {
        // Twice the radius to make things easier to select
        return this.pos.dist(createVector(mouseX, mouseY)) < this.r * 2;
    }
}