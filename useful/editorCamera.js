import { snap } from "./ui/snapKnot";

export class EditorCamera {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        /**
         * this.offset
         * this.initialPos
         */
        this.scale = 1;
    }

    draw() {
        translate(width / 2, height / 2);
        scale(this.scale);
        translate(-this.pos.x, -this.pos.y);

        if (this.offset) {
            window.mousePos = p5.Vector.sub(this.offset, createVector(mouseX, mouseY));
        } else {
            // looks like you need to reverse the order:
            // translate to center, scale, translate pos
            // untranslate center, unscale, untranslate pos
            window.mousePos = createVector(mouseX, mouseY).sub(createVector(width / 2, height / 2)).div(this.scale).add(this.pos);
        }

        if (this.offset) {
            this.pos = mousePos.add(this.initialPos);
        }
    }

    drawGrid() {
        push();
        strokeWeight(1);
        for (let i = snap(this.pos.x - width / 2 / this.scale); i < snap(this.pos.x + width / 2 / this.scale); i += 25) {
            stroke(255, i % 50 == 0 ? 125 : 50);
            line(i, this.pos.y - height / 2 / this.scale, i, this.pos.y + height / 2 / this.scale);
        }

        for (let i = snap(this.pos.y - height / 2 / this.scale); i < snap(this.pos.y + height / 2 / this.scale); i += 25) {
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

    changeScale(delta) {
        if (delta > 0) {
            this.scale *= 0.9;
        } else {
            this.scale *= 1.1;
        }

        // todo: get camera to move somehow
    }
}