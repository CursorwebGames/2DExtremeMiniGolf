import { Ball } from "./ball";
import { MAX_SPEED, MIN_INPUT_SPEED, VISUAL_SPEED } from "../config";
import { BallEffect } from "./ballEffects/ballEffect";

const pulseDuration = 15;
const pauseDuration = 10;
const pulseSpeed = 0.2;

export class MainBall extends Ball {
    /** If ball is in hole, you are at rest, but can't make any more moves */
    inHole = false;

    dragStart?: p5.Vector | null;

    idleTick: number;

    /**
     * The position to reset back to if ball into water:
     * where it started the stroke
     */
    strokeStartPos: p5.Vector;

    // todo: methods like addEffect and removeEffect
    effect: BallEffect | null;

    constructor(x: number, y: number) {
        super(x, y, 10);

        this.strokeStartPos = this.pos.copy();
        this.idleTick = 0;

        this.effect = null;
    }

    draw() {
        if (!this.effect) {
            if (this.dragStart && this.canShoot()) {
                this.showDrag();
            }

            super.draw();

            // reset idle animation
            if (this.dragStart) {
                this.idleTick = 0;
            }

            // user is not dragging, and ball is at rest
            if (!this.dragStart && this.vel.mag() == 0) {
                this.drawIdle();
            }
        } else {
            this.effect.draw();
        }
    }

    private drawIdle() {
        this.idleTick += pulseSpeed;
        this.idleTick %= pulseDuration + pauseDuration;

        const tick = this.idleTick;
        if (tick < 15) {
            noFill();

            // sin function starts at a value less than 0 (stay transparent longer)
            stroke(255, sin(((tick - 1) / pulseDuration) * PI) * 128);

            // sin function goes: -1 -> 1 -> 1; tick = [0, 15]
            strokeWeight(1 + 0.5 * sin((tick / (pulseDuration / 2) - 0.5) * PI));
            circle(this.pos.x, this.pos.y, this.r + 20 + tick);
        }
    }

    /**
     * @returns true if successfully made a stroke
     */
    shoot() {
        // either ball in movement, or player hasn't made an input yet
        if (!this.canShoot() || !this.dragStart) return false;

        const dir = this.getDir();
        this.dragStart = null;

        // if user input is too small, cancel the input
        if (dir.mag() < MIN_INPUT_SPEED) return false;

        this.strokeStartPos = this.pos.copy();

        // convert from visual speed (longer) to actual speed
        const vel = dir.div(VISUAL_SPEED);
        this.applyForce(vel);

        return true;
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

    /**
     * Gets the user's input in screen coordinates, won't scale to actual velocities.
     * As a reminder, the visual indicator is significantly longer than the actual velocity.
     */
    getDir() {
        // opposite direction
        return p5.Vector.sub(this.dragStart!, createVector(mouseX, mouseY)).mult(2).limit(MAX_SPEED * VISUAL_SPEED);
    }

    canShoot() {
        return !this.inHole && this.vel.mag() == 0;
    }
}
