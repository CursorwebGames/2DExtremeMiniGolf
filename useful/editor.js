import { Single } from "./ui/single";
import { Polygon } from "./ui/polygon";

import { Hole, MainBall, Water } from "../src/objects";

import { GameManager } from "../src/gameManager";


export class Editor extends GameManager {
    constructor() {
        super();
        this.staticObjs = [];
        this.hasSelected = false;
        this.staticKnots = [];
    }

    init() {
        this.hole = new Single(new Hole(width / 2, height / 2));
        this.mainb = new Single(new MainBall(width / 2, height / 2));
        this.staticObjs.push(new Polygon(new Water([])));
    }

    draw() {
        background(123, 255, 123);
        for (const obj of this.staticObjs) {
            obj.draw();
        }

        this.hole.draw();
        this.mainb.draw();

        if (!this.hasSelected) {
            this.checkKnots();
        }
    }

    checkKnots() {
        // the topmost knot will be the most recently added knot
        // only one knot can be checked at a time
        // once a knot is being dragged, don't check for any more collisions
        // based on reverse render order: hole, balls, objects
        if (this.mainb.knot.check()) {
            this.hasSelected = true;
            return;
        }

        if (this.hole.knot.check()) {
            this.hasSelected = true;
        }

        for (let i = this.staticKnots.length - 1; i >= 0; i--) {
            const knot = this.staticKnots[i];
            if (knot.check()) {
                this.hasSelected = true;
                return;
            }
        }
    }
}