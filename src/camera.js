export class Camera {
    constructor(minx, miny, maxx, maxy) {
        this.x = main.mainb.pos.x;
        this.y = main.mainb.pos.y;

        // define boundaries of map, padding added
        this.minx = minx - width / 4 + width / 2;
        this.miny = miny - height / 4 + height / 2;
        this.maxx = maxx + width / 4 - width / 2;
        this.maxy = maxy + height / 4 - height / 2;

        this.scale = 1;
    }

    draw() {
        // equation: mainb.x - mainb.x + width / 2
        // const tx = width / 2 - this.x;
        // const ty = height / 2 - this.y;

        // shift mousex from absolute to relative
        // it's absolute because technically mouseX at 0 IS 0 (if the camera wasn't there)
        // window.mousex = mouseX - tx;
        // window.mousey = mouseY - ty;

        translate(width / 2, height / 2);
        scale(this.scale);
        translate(-this.x, -this.y);

        const mousePos = createVector(mouseX, mouseY).sub(createVector(width / 2, height / 2)).div(this.scale).add(createVector(this.x, this.y));

        window.mousex = mousePos.x;
        window.mousey = mousePos.y;

        this.x = constrain(lerp(this.x, main.mainb.pos.x, 0.1), this.minx, this.maxx);
        this.y = constrain(lerp(this.y, main.mainb.pos.y, 0.1), this.miny, this.maxy);
    }
}
