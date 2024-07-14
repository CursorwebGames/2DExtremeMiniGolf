export class EditorCamera {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        /**
         * this.offset
         * this.initialPos
         */
    }

    draw() {
        const tx = width / 2 - this.pos.x;
        const ty = height / 2 - this.pos.y;

        translate(tx, ty);

        if (this.offset) {
            window.mousePos = p5.Vector.sub(this.offset, createVector(mouseX, mouseY));
        } else {
            window.mousePos = createVector(round(mouseX), round(mouseY)).sub(createVector(round(tx), round(ty)));
        }

        if (this.offset) {
            this.pos = mousePos.add(this.initialPos);
        }
    }

    beginMove() {
        this.initialPos = this.pos.copy();
        this.offset = createVector(mouseX, mouseY);
    }

    endMove() {
        this.initialPos = null;
        this.offset = null;
    }
}