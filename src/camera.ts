import { Ball } from "./objects/ball";

export class Camera {
    pos: p5.Vector;
    ball: Ball;

    minx: number;
    miny: number;
    maxx: number;
    maxy: number;

    scale: number;

    // TODO: ON RESIZE
    constructor(ball: Ball, minx: number, miny: number, maxx: number, maxy: number) {
        this.ball = ball;
        this.pos = ball.pos.copy(); // TODO

        // define boundaries of map, padding added
        this.minx = minx - width / 4 + width / 2;
        this.miny = miny - height / 4 + height / 2;
        this.maxx = maxx + width / 4 - width / 2;
        this.maxy = maxy + height / 4 - height / 2;

        this.scale = 1;
    }

    draw() {
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

        this.pos.x = constrain(lerp(this.pos.x, this.ball.pos.x, 0.1), this.minx, this.maxx);
        this.pos.y = constrain(lerp(this.pos.y, this.ball.pos.y, 0.1), this.miny, this.maxy);
    }
}
