import { Wall } from "./wall";
export class MovingPlatform extends Wall {
    constructor(x, y, w, h, dw, dh, speed = 0.01) {
        super(x, y, w, h);
        this.sx = x;
        this.sy = y;
        this.dw = dw;
        this.dh = dh;
        this.t = 0;
        this.speed = speed;
    }

    draw() {
        super.draw();
        this.t += this.speed;
        this.x = this.sx + this.dw * cos(this.t);
        this.y = this.sy + this.dh * sin(this.t);
    }
}