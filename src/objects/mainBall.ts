import { Ball } from "./ball";
import { MAX_SPEED, MIN_INPUT_SPEED, VISUAL_SPEED } from "../config";

export class MainBall extends Ball {
    /** If ball is in hole, you are at rest, but can't make any more moves */
    inHole = false;

    dragStart?: p5.Vector | null;

    constructor(x: number, y: number) {
        super(x, y, 10);
    }

    draw() {
        fill(255);
        circle(this.pos.x, this.pos.y, this.r * 2);
        if (this.dragStart && this.canShoot()) {
            this.showDrag();
        }
    }

    showDrag() {
        let dir = this.getDir();
        if (dir.mag() < MIN_INPUT_SPEED) return;

        for (let i = 1; i < 6; i++) {
            const vec = createVector().lerp(dir, i / 5);
            circle(vec.x + this.pos.x, vec.y + this.pos.y, 5);
        }
    }

    /** Gets the user's input, without accounting for scaling */
    getDir() {
        // opposite direction
        return p5.Vector.sub(this.dragStart!, createVector(mouseX, mouseY)).mult(2).limit(MAX_SPEED * VISUAL_SPEED);
    }

    canShoot() {
        return !this.inHole && this.vel.mag() == 0;
    }
}
