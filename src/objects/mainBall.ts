import { Ball } from "./ball";
import { MAX_SPEED, MIN_INPUT_SPEED, VISUAL_SPEED } from "../config";

const PULSE_DURATION = 15;
const PAUSE_DURATION = 10;
const PULSE_SPEED = 0.2;

export class MainBall extends Ball {
    /** If ball is in hole, you are at rest, but can't make any more moves */
    inHole = false;

    dragStart?: p5.Vector | null;

    idleTick: number;

    constructor(x: number, y: number) {
        super(x, y, 10);
        this.idleTick = 0;
    }

    draw() {
        if (this.dragStart && this.canShoot()) {
            this.showDrag();
        }

        super.draw();

        if (this.dragStart) {
            this.idleTick = 0;
        }

        if (!this.dragStart && this.vel.mag() == 0) {
            this.idleTick += PULSE_SPEED;
            this.idleTick %= PULSE_DURATION + PAUSE_DURATION;

            const tick = this.idleTick;
            if (tick < 15) {
                noFill();

                // sin function starts at a value less than 0 (stay transparent longer)
                stroke(255, sin(((tick - 1) / PULSE_DURATION) * PI) * 128);

                // sin function goes: -1 -> 1 -> 1; tick = [0, 15]
                strokeWeight(1 + 0.5 * sin((tick / (PULSE_DURATION / 2) - 0.5) * PI));
                circle(this.pos.x, this.pos.y, this.r + 20 + tick);
            }
        }
    }

    showDrag() {
        let dir = this.getDir();
        if (dir.mag() < MIN_INPUT_SPEED) return;

        fill(0, 0.25 * 255);
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
