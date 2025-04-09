import { circCircCol } from "../collisions";
import { Ball } from "./ball";
import { Obstacle } from "./obstacle";

export class Teleporter implements Obstacle<false | 1 | -1> {
    start: p5.Vector;
    end: p5.Vector;
    r: number;

    /**
     * Possible values:
     * * `false` - hasn't teleported anywhere recently
     * * `1` - teleported to end
     * * `-1` - teleported to start
     */
    hasTeleportedTo: false | 1 | -1;

    /**
     * When ball touches the start portal, we teleport them to the end portal, and we set end portal as the checker: the person it can't go into
     */
    constructor(sx: number, sy: number, ex: number, ey: number) {
        this.start = createVector(sx, sy);
        this.end = createVector(ex, ey);
        this.r = 14;

        // which portal it should be touching
        // at the end
        this.hasTeleportedTo = false;
    }

    draw() {
        push();
        noFill();
        strokeWeight(4);
        stroke(123, 123, 255);
        circle(this.start.x, this.start.y, this.r * 2);
        stroke(255, 179, 3);
        circle(this.end.x, this.end.y, this.r * 2);
        pop();
    }

    collide(obj: Ball, dest: 1 | -1) {
        // The portal to teleport to
        let destPos;
        // The previous portal
        let checkPos;

        if (dest != this.hasTeleportedTo) {
            throw Error("shouldn't they equal wt");
        }

        if (dest == -1) {
            destPos = this.start.copy();
        } else {
            destPos = this.end.copy();
        }

        if (this.hasTeleportedTo == -1) {
            checkPos = this.start.copy();
        } else {
            checkPos = this.end.copy();
        }

        if (obj.pos.dist(checkPos) <= this.r + obj.r) {
            return;
        }

        obj.pos = destPos;
    }

    isColliding(obj: Ball) {
        if (circCircCol(obj.pos, obj.r, this.start, this.r)) {
            if (!this.hasTeleportedTo) {
                this.hasTeleportedTo = 1;
            }

            return 1;
        }

        if (circCircCol(obj.pos, obj.r, this.end, this.r)) {
            if (!this.hasTeleportedTo) {
                this.hasTeleportedTo = -1;
            }

            return -1;
        }

        this.hasTeleportedTo = false;
        return false;
    }
}