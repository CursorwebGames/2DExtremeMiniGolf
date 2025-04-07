import { Vector } from "p5";

const friction = 0.016;
export const maxSpeed = 10;

export class Ball {
    pos: Vector;
    vel: Vector;
    r: number;

    /** The position to reset back to if ball into water */
    prevPos: Vector;

    constructor(x: number, y: number, r: number) {
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
     */
    applyForce(f: p5.Vector) {
        this.vel.add(f);
    }

    update(frac = 1) {
        this.pos.add(Vector.div(this.vel, frac) as unknown as Vector);
        this.vel.mult(1 - friction / frac);
        this.vel.limit(maxSpeed);
        if (this.vel.mag() > 0 && this.vel.mag() < 0.03) {
            this.prevPos = this.pos.copy();
            this.vel.setMag(0);
        }
    }
}
