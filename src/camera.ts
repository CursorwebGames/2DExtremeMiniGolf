import { Ball } from "./objects/ball";

const PADDING_X = 240;
const PADDING_Y = 190;

export class Camera {
    pos: p5.Vector;
    ball: Ball;

    minx!: number;
    miny!: number;
    maxx!: number;
    maxy!: number;

    scale: number;

    /** Absolute values which are useful on resize */
    absBounds: { minx: number; miny: number; maxx: number; maxy: number; };

    // TODO: ON RESIZE
    constructor(ball: Ball, minx: number, miny: number, maxx: number, maxy: number) {
        this.ball = ball;
        this.pos = ball.pos.copy();

        this.absBounds = { minx, miny, maxx, maxy };
        this.windowResized();

        // TODO: make aspect ratios constant
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
        this.pos.x = constrain(lerp(this.pos.x, this.ball.pos.x, 0.1), this.minx, this.maxx);
        this.pos.y = constrain(lerp(this.pos.y, this.ball.pos.y, 0.1), this.miny, this.maxy);

        translate(width / 2, height / 2);
        scale(this.scale);
        translate(-this.pos.x, -this.pos.y);

        const mousePos = createVector(mouseX, mouseY).sub(createVector(width / 2, height / 2)).div(this.scale).add(this.pos);

        window.mousex = mousePos.x;
        window.mousey = mousePos.y;
    }

    scaleTo(size: number) {
        this.scale = lerp(this.scale, size, 0.1);
    }

    windowResized() {
        const abs = this.absBounds;

        const middlex = (abs.minx + abs.maxx) / 2;
        const middley = (abs.miny + abs.maxy) / 2;

        this.minx = Math.min(abs.minx + PADDING_X, middlex);
        this.miny = Math.min(abs.miny + PADDING_Y, middley);
        this.maxx = Math.max(abs.maxx - PADDING_X, middlex);
        this.maxy = Math.max(abs.maxy - PADDING_Y, middley);
    }
}
