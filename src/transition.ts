
import { MainBall } from "./objects/mainball";
import { Hole } from "./objects/hole";

let level = 0;

export class Transition {
    constructor() {
        this.a = 0;

        // 0: nothing
        // 1: fade out
        // -1: fade back in
        this.direction = 0;
    }

    draw() {
        fill(255, this.a);
        rect(0, 0, width, height);

        this.a += this.direction * 5;

        if (this.a == 300) {
            level++;
            generateLevel();
            this.direction = -1;
        }

        if (this.a < 0) {
            this.end();
        }
    }

    begin() {
        this.direction = 1;
    }

    end() {
        this.direction = 0;
        this.a = 0;
    }
}


export function generateLevel() {
    const levelData = window.levels[level];
    window.mainb = new MainBall(...levelData.mainb);
    window.hole = new Hole(...levelData.hole);

    // todo: deep copy
    window.staticObjs = levelData.static;
    window.balls = levelData.balls;

    window.balls.push(mainb);
}