import { SingleUI } from "./ui/singleUI";

import { Hole, MainBall } from "../src/objects";
import { GameManager } from "../src/gameManager";
import { Camera } from "../src/camera";
import { Transition } from "../src/transition";


// todo remove unnecessary
export class EditorManager {
    constructor() {
        this.balls = [];
        this.staticObjs = [];

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

        // todo: get this to be with others
        this.levelBounds = [[0, 0], [width, 0], [width, height], [0, height]];
    }

    /**
     * GameManager injection
     * essentially, we create a fake gameManager, and then
     * replace the global main (which is the only instance of the singleton)
     * 
     * after we are done, we just refresh the position of the main ball based on its knot
     */
    playMode() {
        const player = new EditorPlayer(this);
        window.main = player;
        player.init();
        player.generateLevel();
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

export class EditorPlayer extends GameManager {
    constructor(editor) {
        super();
        this.editor = editor;
    }

    // ???
    init() {
        this.transition = new Transition(this.reset);
    }

    reset() {
        window.main = this.editor;

        const mainb = this.editor.mainb.obj;
        mainb.vel.setMag(0);
        mainb.inHole = true;

        this.editor.mainb.update();
    }

    generateLevel() {
        this.mainb = this.editor.mainb.obj;
        this.mainb.inHole = false;
        this.balls.push(this.mainb);

        this.hole = this.editor.hole.obj;
        this.hole.ballIn = false;

        for (const objUI of this.editor.staticObjs) {
            this.staticObjs.push(objUI.obj);
        }

        const bounds = this.editor.levelBounds;
        this.levelBounds = bounds;

        let minx = bounds[0][0], miny = bounds[0][1], maxx = bounds[0][0], maxy = bounds[0][1];

        for (let i = 1; i < bounds.length; i++) {
            let [x, y] = bounds[i];
            if (x < minx) minx = x;
            if (y < miny) miny = y;
            if (x > maxx) maxx = x;
            if (y > maxy) maxy = y;
        }

        this.camera = new Camera(minx, miny, maxx, maxy);
    }
}