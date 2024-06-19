const friction = 0.016;

export class Ball {
    constructor(x, y, r) {
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
     * @param f Force
     */
    applyForce(f: p5.Vector) {
        this.vel.add(f);
    }

    update() {
        this.checkBounds();
        this.pos.add(this.vel);
        this.vel.mult(1 - friction);
        this.vel.limit(10);
        if (this.vel.mag() < 0.02) {
            this.vel.setMag(0);
        }
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
