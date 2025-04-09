import { circCircCol } from "../collisions";
import { Ball } from "./ball";
import { Obstacle } from "./obstacle";

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
        fill("yellow");
        if (this.hit > 0) this.hit--;
        circle(this.pos.x, this.pos.y, this.r * 2 + (this.hit ? 20 : 0));
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