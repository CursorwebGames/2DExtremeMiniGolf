import { circCircCol } from "../collisions";
import { Ball } from "./ball";
import { Obstacle } from "./obstacle";

const ArrowCount = 7;

export class Bouncer implements Obstacle {
    pos: p5.Vector;
    r: number;
    hit: number;

    constructor(x: number, y: number) {
        this.pos = createVector(x, y);
        this.r = 30;
        this.hit = 0;
    }

    draw() {
        let hit = this.hit;

        push();
        translate(this.pos.x, this.pos.y);
        scale(1 + hit / 25);

        // shadow
        fill(0, 0.25 * 255);
        circle(1.5, 1.5, this.r * 2 + hit);

        // ball
        fill(255, 255, 0);
        circle(0, 0, this.r * 2 + hit);

        // deco
        fill(150, 150, 0);
        circle(0, 0, 10);
        // TODO: rotate based on the way you hit it
        rotate(hit / 10);
        for (let i = 0; i < ArrowCount; i++) {
            rotate(2 * PI / ArrowCount);
            triangle(0, -20, 5, -15, -5, -15);
            rect(-2.5, -16, 5, 5);
        }
        pop();

        if (this.hit > 0) this.hit--;
    }

    isColliding(obj: Ball) {
        return circCircCol(obj.pos, obj.r, this.pos, this.r);
    }

    collide(obj: Ball) {
        let dir = p5.Vector.sub(obj.pos, this.pos);
        obj.applyForce(dir.setMag(16));
        this.hit = 10;
    }
}