import { circCircCol } from "../../collisions";
import { PhysicsObj, StaticObj } from "../IStatic";

export class Bouncer implements StaticObj {
    pos: p5.Vector;
    r: number;
    hit: number;

    constructor(x: number, y: number, r: number) {
        this.pos = createVector(x, y);
        this.r = r;
        this.hit = 0;
    }

    draw() {
        fill("yellow");
        if (this.hit > 0) this.hit--;
        circle(this.pos.x, this.pos.y, this.r * 2 + (this.hit ? 20 : 0));
    }

    isColliding(obj: PhysicsObj) {
        return circCircCol(obj.pos, obj.r, this.pos, this.r);
    }

    collide(obj: PhysicsObj) {
        let dir = p5.Vector.sub(obj.pos, this.pos);
        obj.applyForce(dir.setMag(16));
        this.hit = 10;
    }
}