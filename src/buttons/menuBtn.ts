import { pointRectCol } from "../collisions";
import { Button } from "./button";

// todo: make size less negotiable
// going back to that mobile mode vs not mobile mode
export class MenuBtn implements Button {
    text: string;
    x: number;
    y: number;
    w: number;
    h: number;

    onClick: () => void;

    constructor(text: string, x: number, y: number, onClick: () => void) {
        this.text = text;

        const h = 70;
        const w = 500;

        this.x = x - w / 2;
        this.y = y - h / 2;
        this.w = w;
        this.h = h;
        this.onClick = onClick;
    }

    mouseOver(): boolean {
        return pointRectCol(mouseX, mouseY, this.x, this.y, this.w, this.h);
    }

    draw(): void {
        strokeWeight(4);
        stroke(70);
        if (this.mouseOver()) {
            fill(0, 0, 0, 200);
        } else {
            fill(0, 0, 0, 128);
        }
        rect(this.x, this.y, this.w, this.h);

        fill(255);
        textSize(30);
        textAlign(CENTER);
        text(this.text, this.x, this.y + this.h / 2 - 15, this.w, this.h);
    }
}