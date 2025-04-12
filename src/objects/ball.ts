import { MAX_SPEED, MIN_SPEED } from "../config";
import { circPolyCol, CircPolyColResult } from "../collisions";

const friction = 0.016;

export class Ball {
    pos: p5.Vector;
    vel: p5.Vector;
    r: number;

    /** The position to reset back to if ball into water */
    prevPos: p5.Vector;

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
     * Checks bounds and friction slows down (essentially handles ball in an empty field w/ walls)
     * @param ccd CCD, this way makes it easy to debug ccd-related bugs (rare)
     */
    update(bounds: PointArr, ccd = 1) {
        this.checkBounds(bounds);

        // hack cuz @types/p5 is doing a bad job
        this.pos.add(p5.Vector.div(this.vel, ccd) as unknown as p5.Vector);
        this.vel.mult(1 - friction / ccd);
        this.vel.limit(MAX_SPEED);

        // don't run this code if the ball is at rest
        if (this.vel.mag() > 0 && this.vel.mag() < MIN_SPEED) {
            this.prevPos = this.pos.copy();
            this.vel.setMag(0);
        }
    }

    private checkBounds(bounds: PointArr) {
        // note: let { a } = false; doesn't throw error
        // look, if javascript supports a match feature, ofc i'd use that. But it doesn't so I have to do this.
        let { projPoint, edge } = circPolyCol(this.pos, this.r, bounds) as CircPolyColResult;
        if (projPoint) {
            let diff = p5.Vector.sub(this.pos, projPoint);
            let speed = this.vel.mag();

            let ang = Math.abs(this.vel.angleBetween(edge!));

            this.pos.add(p5.Vector.setMag(diff, this.r - diff.mag()));
            this.applyForce(diff.setMag(2 * Math.sin(ang) * speed));
        }
    }
}
