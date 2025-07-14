import { circCircCol } from "../collisions";
import { Ball } from "./ball";
import { Obstacle } from "./obstacle";

export class Teleporter implements Obstacle<null | "end" | "start"> {
    start: p5.Vector;
    end: p5.Vector;
    r: number;

    /**
     * Possible values:
     * * `null` - hasn't teleported anywhere recently
     * * `end` - teleported to end
     * * `start` - teleported to start
     */
    hasTeleportedTo: null | "end" | "start";

    portalTick: number[];

    /**
     * When ball touches the start portal, we teleport them to the end portal, and we set end portal as the checker: the person it can't go into
     * Start = orange
     * End = blue
     * 
     * For legacy reasons, end starts first
     */
    constructor(ex: number, ey: number, sx: number, sy: number) {
        this.start = createVector(sx, sy);
        this.end = createVector(ex, ey);
        this.r = 14;

        // which portal it should be touching
        // at the end
        this.hasTeleportedTo = null;
        this.portalTick = [0, -10, -20];
    }

    draw() {
        push();

        noFill();
        strokeWeight(8);
        stroke(123, 123, 255, 0.4 * 255);
        circle(this.end.x, this.end.y, this.r * 2 + 8);
        strokeWeight(4);
        stroke(123, 123, 255);
        circle(this.end.x, this.end.y, this.r * 2);

        strokeWeight(8);
        stroke(219, 141, 15, 0.4 * 255);
        circle(this.start.x, this.start.y, this.r * 2 + 8);
        strokeWeight(4);
        stroke(219, 141, 15);
        circle(this.start.x, this.start.y, this.r * 2);

        // 2: stroke weight, 5: gap
        const diam = this.r * 2 - 2 + 5;

        for (let i = 0; i < 3; i++) {
            this.portalTick[i] += 0.3;
            this.portalTick[i] %= diam;
            let tick = max(this.portalTick[i], 0);

            const r = tick;
            if (r > 0) {
                strokeWeight(1 - r / diam);
                stroke(219, 141, 15);
                circle(this.start.x, this.start.y, r);
                stroke(123, 123, 255);
                circle(this.end.x, this.end.y, r);
            }
        }


        pop();
    }

    /**
     * `-1 == start`
     * `1 == end`
     */
    collide(obj: Ball, dest: "start" | "end") {
        // The portal to teleport to
        let destPos;
        // The previous portal
        let checkPos;

        if (dest == "start") {
            destPos = this.start.copy();
        } else {
            destPos = this.end.copy();
        }

        if (this.hasTeleportedTo == "start") {
            checkPos = this.start.copy();
        } else {
            checkPos = this.end.copy();
        }

        // just teleported to that portal, so the ball would be in that portal
        if (obj.pos.dist(checkPos) <= this.r + obj.r) {
            return;
        }

        obj.pos = destPos;
    }

    isColliding(obj: Ball) {
        if (circCircCol(obj.pos, obj.r, this.start, this.r)) {
            if (!this.hasTeleportedTo) {
                this.hasTeleportedTo = "end";
            }

            return "end";
        }

        if (circCircCol(obj.pos, obj.r, this.end, this.r)) {
            if (!this.hasTeleportedTo) {
                this.hasTeleportedTo = "start";
            }

            return "start";
        }

        this.hasTeleportedTo = null;
        return null;
    }
}