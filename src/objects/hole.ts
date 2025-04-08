import { Vector } from "p5";
import { circCircCol } from "../collisions";
import { Ball } from "./ball";

export class Hole {
    pos: Vector;
    ballIn: boolean;
    r: number;

    constructor(x: number, y: number) {
        this.pos = createVector(x, y);
        this.ballIn = false;
        this.r = 12;
    }

    draw() {
        fill(0);
        circle(this.pos.x, this.pos.y, this.r * 2);
    }

    isColliding(ball: Ball) {
        return circCircCol(ball.pos, ball.r, this.pos, this.r);
    }
}