const friction = 0.016;

class Ball {
    constructor(x, y, r = 30) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.r = r;
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
    }

    checkBounds() {
        if (this.pos.x > width - this.r) {
            this.vel.x *= -1;
            this.pos.x = width - this.r;
        }

        if (this.pos.x < this.r) {
            this.vel.x *= - 1;
            this.pos.x = this.r;
        }

        if (this.pos.y > height - this.r) {
            this.vel.y *= -1;
            this.pos.y = height - this.r;
        }

        if (this.pos.y < this.r) {
            this.vel.y *= -1;
            this.pos.y = this.r;
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
