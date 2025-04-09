import { circPolyCol } from "../collisions";
import { Ball } from "./ball";

// hehe
const startColor = color(61, 137, 255);
const toColor = color(0, 73, 186);

export class Water {
    points: PointArr;

    /**
     * we will scale a bunch of versions of this polygon to create a depth effect
     * so, the render polygon will actually be centered at `0, 0`
     */
    render: PointArr;

    cx: number;
    cy: number;

    constructor(points: PointArr) {
        this.points = points;

        let cx = 0, cy = 0;
        for (const [x, y] of points) {
            cx += x;
            cy += y;
        }
        cx /= points.length;
        cy /= points.length;

        this.render = [];
        for (const [x, y] of points) {
            this.render.push([x - cx, y - cy]);
        }

        this.cx = cx;
        this.cy = cy;
    }

    draw() {
        fill(40, 150, 255);
        push();
        translate(this.cx, this.cy);
        scale(1);
        for (let i = -1; i < 4; i++) {
            let c;
            if (i == -1) {
                c = color(255, 247, 128);
            } else {
                c = lerpColor(startColor, toColor, i / 4);
            }
            fill(c);
            beginShape();
            for (const [x, y] of this.render) {
                vertex(x, y);
            }
            endShape();
            scale(0.9);
        }
        pop();
    }

    collide(obj: Ball) {
        obj.pos = obj.prevPos.copy();
        obj.vel.setMag(0);
        // TODO: transition
    }

    isColliding(ball: Ball) {
        return circPolyCol(ball.pos, ball.r, this.points);
    }
}