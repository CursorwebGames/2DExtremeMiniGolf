export class EditorCamera {
    pos: p5.Vector;
    scale: number;

    /**
     * When the user starts dragging, the initial position is the screen coordinate
     * Offset is wherever the mouse is currently.
     * By taking the difference, you can know how much to move the camera.
     */
    initialPos: p5.Vector | null;
    offset: p5.Vector | null;

    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.offset = null;
        this.initialPos = null;
        this.scale = 1;
    }

    draw() {
        translate(width / 2, height / 2);
        scale(this.scale);
        translate(-this.pos.x, -this.pos.y);

        if (this.offset) {
            // this is in 'screen' coordinates, in other words, from 0 to width limited
            // offset was when the drag started
            window.mousePos = p5.Vector.sub(this.offset, createVector(mouseX, mouseY)).div(this.scale);
        } else {
            // looks like you need to reverse the order:
            // translate to center, scale, translate pos
            // untranslate center, unscale, untranslate pos
            window.mousePos = createVector(mouseX, mouseY).sub(createVector(width / 2, height / 2)).div(this.scale).add(this.pos);
        }

        if (this.offset) {
            this.pos = window.mousePos.add(this.initialPos!);
        }
    }

    drawGrid() {
        push();
        strokeWeight(1);
        for (let i = snap(this.pos.x - width / 2 / this.scale); i <= snap(this.pos.x + width / 2 / this.scale); i += 25) {
            stroke(255, i % 50 == 0 ? 125 : 50);
            line(i, this.pos.y - height / 2 / this.scale, i, this.pos.y + height / 2 / this.scale);
        }

        for (let i = snap(this.pos.y - height / 2 / this.scale); i <= snap(this.pos.y + height / 2 / this.scale); i += 25) {
            stroke(255, i % 50 == 0 ? 125 : 50);
            line(this.pos.x - width / 2 / this.scale, i, this.pos.x + width / 2 / this.scale, i);
        }
        pop();
    }

    beginMove() {
        this.initialPos = this.pos.copy();
        this.offset = createVector(mouseX, mouseY);
    }

    endMove() {
        this.initialPos = null;
        this.offset = null;
    }

    changeScale(delta: number) {
        if (delta > 0) {
            this.scale *= 0.9;
        } else {
            this.scale *= 1.1;
        }
    }
}

function snap(x: number) {
    return round(x / 50) * 50;
}