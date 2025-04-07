import { Vector } from "p5";
import { Ball } from "./objects/ball";

export class Camera {
    pos: Vector;

    minx: number;
    miny: number;
    maxx: number;
    maxy: number;

    scale: number;

    constructor(minx: number, miny: number, maxx: number, maxy: number) {
        this.pos = createVector(0, 0); // TODO

        // define boundaries of map, padding added
        this.minx = minx - width / 4 + width / 2;
        this.miny = miny - height / 4 + height / 2;
        this.maxx = maxx + width / 4 - width / 2;
        this.maxy = maxy + height / 4 - height / 2;

        this.scale = 1;
    }

    update(ball: Ball) {
        /*
        equation: mainb.x - mainb.x + width / 2
        const tx = width / 2 - this.x;
        const ty = height / 2 - this.y;

        shift mousex from absolute to relative
        it's absolute because technically mouseX at 0 IS 0 (if the camera wasn't there)
        window.mousex = mouseX - tx;
        window.mousey = mouseY - ty;
        */
        translate(width / 2, height / 2);
        scale(this.scale);
        translate(-this.pos.x, -this.pos.y);

        const mousePos = createVector(mouseX, mouseY).sub(createVector(width / 2, height / 2)).div(this.scale).add(this.pos);

        window.mousex = mousePos.x;
        window.mousey = mousePos.y;

        this.pos.x = constrain(lerp(this.pos.x, ball.pos.x, 0.1), this.minx, this.maxx);
        this.pos.y = constrain(lerp(this.pos.y, ball.pos.y, 0.1), this.miny, this.maxy);
    }
}
