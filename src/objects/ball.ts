import { Vector } from "p5";
import { MAX_SPEED } from "../config";
import { circPolyCol } from "../collisions";

const friction = 0.016;

export class Ball {
    pos: Vector;
    vel: Vector;
    r: number;

    /** The position to reset back to if ball into water */
    prevPos: Vector;

    constructor(x: number, y: number, r = 10) {
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

    /**
     * @param ccd CCD, this way makes it easy to debug ccd-related bugs (rare)
     */
    update(bounds: PointArr, ccd = 1) {
        this.checkBounds(bounds);
        this.pos.add(Vector.div(this.vel, ccd) as unknown as Vector);
        this.vel.mult(1 - friction / ccd);
        this.vel.limit(MAX_SPEED);

        if (this.vel.mag() > 0 && this.vel.mag() < 0.03) {
            this.prevPos = this.pos.copy();
            this.vel.setMag(0);
        }
    }

    checkBounds(bounds: PointArr) {
        let { projPoint, edge } = circPolyCol(this.pos, this.r, bounds);
        if (projPoint) {
            let diff = p5.Vector.sub(this.pos, projPoint);
            let speed = this.vel.mag();

            let ang = Math.abs(this.vel.angleBetween(edge!));

            this.pos.add(p5.Vector.setMag(diff, this.r - diff.mag()));
            this.applyForce(diff.setMag(2 * Math.sin(ang) * speed));
        }
    }
}
