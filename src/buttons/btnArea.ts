import { pointRectCol } from "../collisions";

/**
 * Dummy rect class -- only for handling collisions
 */
export class BtnRectArea {
    x: number;
    y: number;
    w: number;
    h: number;

    constructor(x: number, y: number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    mouseOver() {
        return pointRectCol(mouseX, mouseY, this.x, this.y, this.w, this.h);
    }
}