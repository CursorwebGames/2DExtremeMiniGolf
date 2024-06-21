import { circPolyCol } from "../collisions";

export class Water {
    constructor(points) {
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

        this.startColor = color(61, 137, 255);
        this.toColor = color(0, 73, 186);
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
                c = lerpColor(this.startColor, this.toColor, i / 4);
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

    collide(obj) {
        obj.pos = obj.prevPos.copy();
        obj.vel.setMag(0);
        // todo: transition
    }

    isColliding(ball) {
        return circPolyCol(ball.pos, ball.r, this.points);
    }
}