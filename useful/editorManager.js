import { SingleUI } from "./ui/singleUI";

import { Hole, MainBall } from "../src/objects";
import { GameManager } from "../src/gameManager";


export class EditorManager extends GameManager {
    constructor() {
        /*
        this.mainb
        this.hole
        this.levelBounds
        this.camera
        this.balls
        this.staticObjs
        */
        super();

        /** if there is a knot currently being dragged */
        this.hasSelected = false;
        /** list of static knots of static objects (as opposed to mainb and hole) */
        this.staticKnots = [];
        /** polygon mode: right click to remove, left click to add for a polygon */
        // this.selectedPolygon;
    }

    init() {
        this.mainb = new SingleUI(new MainBall(80, 80), false);
        this.hole = new SingleUI(new Hole(width - 80, height - 80), false);
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
        if (this.selectedPolygon) {
            return;
        }
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
            return;
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