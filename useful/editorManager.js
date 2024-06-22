import { Single } from "./ui/single";
import { Polygon } from "./ui/polygon";

import { Hole, MainBall, Water } from "../src/objects";

import { GameManager } from "../src/gameManager";


export class EditorManager extends GameManager {
    constructor() {
        super();
        this.hasSelected = false;
        this.staticKnots = [];
    }

    init() {
        this.hole = new Single(new Hole(width / 2, height / 2));
        this.mainb = new Single(new MainBall(width / 2, height / 2));
        this.staticObjs.push(new Polygon(new Water([])));
        this.balls.push(this.mainb);
    }

    draw() {
        background(123, 255, 123);

        for (const staticObj of this.staticObjs) {
            staticObj.draw();
        }

        this.hole.draw();

        for (const ball of this.balls) {
            ball.draw();
        }

        if (!this.hasSelected) {
            this.checkKnots();
        }
    }

    checkKnots() {
        // the topmost knot will be the most recently added knot
        // only one knot can be checked at a time
        // once a knot is being dragged, don't check for any more collisions
        // reversing the render order which is: object, hole, balls (rev)

        // todo: should mainb be priority?
        for (let i = this.balls.length - 1; i >= 0; i--) {
            const ball = this.balls[i];
            if (ball.knot.check()) {
                this.hasSelected = true;
                return;
            }
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