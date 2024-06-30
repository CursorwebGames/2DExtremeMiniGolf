import { circPolyCol, pointPolyCol } from "../collisions";

const friction = 0.05;

export class Sand {
    constructor(points) {
        this.points = points;
    }

    draw() {
        push();
        strokeWeight(16);
        stroke(217, 210, 111);
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