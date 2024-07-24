import { circCircCol } from "../collisions";

export class Hole {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.ballIn = false;
        this.r = 12;
    }

    draw() {
        fill(0);
        circle(this.pos.x, this.pos.y, this.r * 2);
    }

    isColliding(ball) {
        return circCircCol(ball.pos, ball.r, this.pos, this.r);
    }

    collide(ball, callback) {
        if (ball.vel.mag() < 0.001 && !this.ballIn) {
            callback();
            this.ballIn = true;
            main.mainb.inHole = true;
        }

        // slow ball down
        ball.vel.mult(0.9);
        let dir = p5.Vector.sub(this.pos, ball.pos);
        ball.applyForce(dir.setMag(this.pos.dist(ball.pos) * 0.1));
    }
}