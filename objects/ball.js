const friction = 0.016;

class Ball {
    constructor(x, y, r) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.r = r;
        this.prevPos = this.pos.copy();
    }

    draw() {
        this.update();
        fill(100);
        circle(this.pos.x, this.pos.y, this.r * 2);
    }

    /**
     * In each frame, multiple forces can be applied
     * And then in update, they will subsequently affect the ball's movement
     * @param {p5.Vector} f Force
     */
    applyForce(f) {
        this.vel.add(f);
    }

    update() {
        this.checkBounds();
        this.pos.add(this.vel);
        this.vel.mult(1 - friction);
        this.vel.limit(10);
        if (this.vel.mag() > 0 && this.vel.mag() < 0.03) {
            this.prevPos = this.pos.copy();
            this.vel.setMag(0);
        }
    }

    checkBounds() {
        let projPoint = circPolyCol(this.pos, this.r, levelBounds);
        if (projPoint) {
            let diff = p5.Vector.sub(this.pos, projPoint);
            let speed = this.vel.mag();
            this.applyForce(diff.setMag(1.9 * speed));
        }
    }

    collide(other) {
        // why the perpendicular?
        let dir = p5.Vector.sub(other.pos, this.pos);
        this.vel.mult(0.8);
        let speed = this.vel.mag();
        other.applyForce(dir.setMag(speed));
    }
}
