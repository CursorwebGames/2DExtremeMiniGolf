import { circPolyCol, pointPolyCol } from "../collisions";

// todo: AHHHHH
const friction = 0.05;

export class Sand {
    constructor(points) {
        this.points = points;
        let minx = points[0][0], miny = points[0][1], maxx = points[0][0], maxy = points[0][1];

        for (let i = 1; i < points.length; i++) {
            let [x, y] = points[i];
            if (x < minx) minx = x;
            if (y < miny) miny = y;
            if (x > maxx) maxx = x;
            if (y > maxy) maxy = y;
        }

        this.minx = minx;
        this.miny = miny;
        this.maxx = maxx;
        this.maxy = maxy;

        // from light to dark
        this.from = color(255, 247, 128);
        this.to = color(217, 210, 111);
    }

    draw() {
        push();
        strokeWeight(16);
        stroke(this.to);
        fill(255, 247, 128);
        beginShape();
        for (const [x, y] of this.points) {
            vertex(x, y);
        }
        endShape(CLOSE);
        pop();
    }

    collide(ball) {
        // do note this will be amplified
        // based on ccd count
        ball.vel.mult(1 - friction);
    }

    isColliding(ball) {
        return circPolyCol(ball.pos, ball.r, this.points) || pointPolyCol(ball.pos, this.points);
    }
}