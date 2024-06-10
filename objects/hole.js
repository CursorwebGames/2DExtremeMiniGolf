class Hole {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.in = false;
    }

    draw() {
        fill(0);
        circle(this.pos.x, this.pos.y, 18 * 2);
    }

    isColliding(ball) {
        return circCircCol(ball.pos, ball.r, this.pos, 18);
    }

    collide(ball) {
        // slow ball down
        ball.vel.mult(0.9);
        let dir = p5.Vector.sub(this.pos, ball.pos);
        ball.applyForce(dir.setMag(this.pos.dist(ball.pos) * 0.1));
    }
}