import { Knot } from "./knot";
import { SnapKnot } from "./snapKnot";

// todo: make on same level as polygon and have a grandfather to both
export class LevelBoundsUI {
    constructor() {
        this.knots = [
            new SnapKnot(0, 0, this),
            new SnapKnot(width, 0, this),
            new SnapKnot(width, height, this),
            new SnapKnot(0, height, this),
        ];

        main.staticKnots.push(...this.knots);
    }

    draw() {
        push();
        // noFill();
        fill(94, 230, 83);
        strokeWeight(3);
        stroke(255);
        beginShape();
        for (const knot of this.knots) {
            vertex(knot.pos.x, knot.pos.y);
        }
        endShape(CLOSE);
        pop();

        for (const knot of this.knots) {
            knot.draw();
        }
    }

    update() { }

    convertKnots() {
        return this.knots.map(knot => [knot.pos.x, knot.pos.y]);
    }

    addPoint(x, y) {
        const knot = new SnapKnot(x, y, this);

        const knots = this.knots;

        if (knots.length < 2) {
            knots.push(knot);
        } else {
            let minDist = Infinity;
            let idx = 0;

            const pos = knot.pos;
            for (let i = 0; i < knots.length; i++) {
                const left = knots[i].pos;
                const right = knots[(i + 1) % knots.length].pos;

                const pointVec = p5.Vector.sub(pos, left);
                const lineVec = p5.Vector.sub(right, left);

                const projPoint = lineVec.setMag(pointVec.dot(lineVec) / lineVec.mag()).add(left);
                const dist = projPoint.dist(pos);

                if (projPoint.dist(left) + projPoint.dist(right) >= left.dist(right) + 5) {
                    continue;
                }

                if (dist < minDist) {
                    idx = i + 1;
                    minDist = dist;
                }
            }

            knots.splice(idx, 0, knot);
        }

        main.staticKnots.push(knot);
        this.update();
    }

    export() {
        return JSON.stringify(this.convertKnots());
    }
}