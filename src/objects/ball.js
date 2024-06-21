import { circPolyCol } from "../collisions";
import { main } from "../main";

const friction = 0.016;

export class Ball {
    constructor(x, y, r) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.r = r;
        this.prevPos = this.pos.copy();
    }

    draw() {
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

    update(frac = 1) {
        this.checkBounds();
        this.pos.add(p5.Vector.div(this.vel, frac));
        this.vel.mult(1 - friction / frac);
        this.vel.limit(10);
        if (this.vel.mag() > 0 && this.vel.mag() < 0.03) {
            this.prevPos = this.pos.copy();
            this.vel.setMag(0);
        }
    }

    checkBounds() {
        let { projPoint, edge } = circPolyCol(this.pos, this.r, main.levelBounds);
        if (projPoint) {
            let diff = p5.Vector.sub(this.pos, projPoint);
            let speed = this.vel.mag();

            let ang = Math.abs(this.vel.angleBetween(edge));

            this.pos.add(p5.Vector.setMag(diff, this.r - diff.mag()));
            this.applyForce(diff.setMag(2 * Math.sin(ang) * speed));
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
