import { Ball } from "./ball";

import "../collisions";

export class MainBall extends Ball {
    constructor(x, y) {
        super(x, y, 10);
        this.inHole = false;
    }

    draw() {
        fill(255);
        circle(this.pos.x, this.pos.y, this.r * 2);

        if (this.vel.mag() == 0 && !this.inHole) {
            for (let i = 1; i < 6; i++) {
                let x = lerp(this.pos.x, mousex, i / 5);
                let y = lerp(this.pos.y, mousey, i / 5);
                circle(x, y, 5);
            }
        }
    }
}