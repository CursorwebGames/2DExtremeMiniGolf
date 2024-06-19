declare global {
    let mousex: number;
    let mousey: number;
}
// let mousex, mousey;

export class Camera {
    x: number;
    y: number;

    minx: number;
    miny: number;
    maxx: number;
    maxy: number;

    constructor(minx: number, miny: number, maxx: number, maxy: number) {
        this.x = mainb.pos.x;
        this.y = mainb.pos.y;

        // define boundaries of map, padding added
        this.minx = minx - 50 + width / 2;
        this.miny = miny - 50 + height / 2;
        this.maxx = maxx + 50 - width / 2;
        this.maxy = maxy + 50 - height / 2;
    }

    draw() {
        // equation: mainb.x - mainb.x + width / 2
        const tx = width / 2 - this.x;
        const ty = height / 2 - this.y;

        translate(tx, ty);

        // shift mousex from absolute to relative
        // it's absolute because technically mouseX at 0 IS 0 (if the camera wasn't there)
        window.mousex = mouseX - tx;
        window.mousey = mouseY - ty;

        this.x = constrain(lerp(this.x, mainb.pos.x, 0.1), this.minx, this.maxx);
        this.y = constrain(lerp(this.y, mainb.pos.y, 0.1), this.miny, this.maxy);
    }
}
