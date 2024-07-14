export class EditorCamera {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        /**
         * this.offset
         * this.initialPos
         */
        this.scale = 0.8;
    }

    draw() {
        const tx = width / 2 - this.pos.x;
        const ty = height / 2 - this.pos.y;

        translate(tx, ty);
        scale(this.scale);

        if (this.offset) {
            window.mousePos = p5.Vector.sub(this.offset, createVector(mouseX, mouseY));
        } else {
            // why???
            window.mousePos = createVector(mouseX, mouseY).sub(createVector(tx, ty)).div(this.scale);
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

    changeScale(delta) {
        if (delta > 0) {
            this.scale *= 0.9;
        } else {
            this.scale *= 1.1;
        }

        // todo: get camera to move somehow
    }
}