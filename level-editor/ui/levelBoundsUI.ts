import { EditorScene } from "../scenes/editorScene";
import { PolygonComponent } from "./PolygonComponent";
import { UIComponent } from "./UIComponent";

export class LevelBoundsUI extends PolygonComponent implements UIComponent {
    constructor(editor: EditorScene, bounds?: PointArr) {
        if (!bounds) {
            bounds = [
                [0, 0],
                [width, 0],
                [width, height],
                [0, height]
            ];
        }
        super(editor, bounds);
    }

    draw() {
        // the shadow and grass
        push();
        fill(94, 230, 83);
        strokeWeight(3);
        stroke(0, 0.25 * 255);
        beginShape();
        for (const knot of this.vknots) {
            vertex(knot.pos.x + 1.5, knot.pos.y + 1.5);
        }
        endShape(CLOSE);
        pop();

        // the white wall
        push();
        noFill();
        strokeWeight(3);
        stroke(255);
        beginShape();
        for (const knot of this.vknots) {
            vertex(knot.pos.x, knot.pos.y);
        }
        endShape(CLOSE);
        pop();

        for (const knot of this.vknots) {
            knot.draw();
        }
    }

    // No need for an update function, knots' positions are directly used
    update() { }
    protected updatePolygon() { }

    toJSON() {
        return this.convertKnots();
    }
}