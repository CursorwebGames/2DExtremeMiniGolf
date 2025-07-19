import { LevelData } from "../../src/levels/levels";
import { Hole } from "../../src/objects/hole";
import { MainBall } from "../../src/objects/mainBall";
import { Scene } from "../../src/scenes/scene";
import { EditorCamera } from "../editorCamera";
import { Knot } from "../ui/knot";
import { LevelBoundsUI } from "../ui/levelBoundsUI";
import { MainBallUI } from "../ui/mainBallUI";
import { PolygonComponent } from "../ui/PolygonComponent";
import { SingleUI } from "../ui/singleUI";
import { UIComponent, UISerializable } from "../ui/UIComponent";


export class EditorScene extends Scene {
    knots: Knot[];

    ball: SingleUI;
    hole: SingleUI;
    obstacleUIs: UISerializable[];
    currEditPolygon: PolygonComponent | null;

    camera: EditorCamera;
    levelBounds: LevelBoundsUI;

    constructor() {
        super();
        this.knots = [];

        /* careful the order! Will affect how knots are added */
        this.levelBounds = new LevelBoundsUI(this);

        this.hole = new SingleUI(new Hole(width - 100, height - 100), this);
        this.ball = new MainBallUI(new MainBall(100, 100), this);

        this.obstacleUIs = [];

        this.camera = new EditorCamera();

        this.currEditPolygon = null;
    }

    /**
     * Removes all previous knots
     * Loads `hole`, `ball`, and `levelBounds`
     */
    importLevel(level: LevelData) {
        this.knots = [];

        this.hole = new SingleUI(new Hole(...level.hole), this);
        this.ball = new MainBallUI(new MainBall(...level.ball), this);

        this.levelBounds = new LevelBoundsUI(this, level.bounds);
        console.log(this.knots);
    }

    draw() {
        background(161, 207, 161);

        push();
        this.camera.draw();
        this.levelBounds.draw();
        this.camera.drawGrid();

        this.hole.draw();
        this.ball.draw();

        for (const obj of this.obstacleUIs) {
            obj.draw();
        }
        pop();

        if (this.currEditPolygon) {
            fill(0);
            textAlign(CENTER);
            textSize(20);
            text("Left click to add vertex, Right click to remove vertex\nEsc to finish", width / 2, 30);
        }
    }

    /**
     * Add knots to the `SceneManager`, as well as register object owner
     * The knot owner is needed so it can propagate updates as needed
     */
    registerKnots(parent: UIComponent, ...knots: Knot[]) {
        for (const knot of knots) {
            knot.parent = parent;
            this.knots.push(knot);
        }
    }

    deregisterKnot(knot: Knot) {
        const i = this.knots.indexOf(knot);
        this.knots.splice(i, 1);
    }

    removeUI(ui: UISerializable) {
        const idx = this.obstacleUIs.indexOf(ui);

        // todo: create a cleanup function
        for (const knot of this.knots) {
            if (knot.parent == ui) {
                this.deregisterKnot(knot);
            }
        }

        this.obstacleUIs.splice(idx, 1);
    }

    mousePressed() {
        if (mouseButton == CENTER) {
            this.camera.beginMove();
            return;
        }

        if (mouseButton == LEFT) {
            for (let i = this.knots.length - 1; i >= 0; i--) {
                const knot = this.knots[i];
                if (knot.mouseOver()) {
                    knot.startDrag();
                    return;
                }
            }
        }

        if (!this.currEditPolygon) {
            return;
        }

        let poly = this.currEditPolygon;

        if (mouseButton == LEFT) {
            poly.addPoint(window.mousePos.x, window.mousePos.y);
        } else if (mouseButton == RIGHT) {
            poly.removePoint();
        }
    }

    mouseDragged() {
        for (const knot of this.knots) {
            if (knot.dragStart) {
                knot.drag();
                break;
            }
        }
    }

    mouseReleased() {
        for (const knot of this.knots) {
            knot.endDrag();
        }

        this.camera.endMove();
    }

    mouseWheel(e: WheelEvent): void {
        this.camera.changeScale(e.deltaY);
    }

    keyPressed() {
        if (this.currEditPolygon && key == "Escape") {
            this.currEditPolygon = null;
        }
    }

    getLevelData(): LevelData {
        const level: LevelData = {
            ball: [this.ball.knot.pos.x, this.ball.knot.pos.y],
            hole: [this.hole.knot.pos.x, this.hole.knot.pos.y],
            bounds: this.levelBounds.toJSON(),
            obstacles: this.obstacleUIs.map(ui => ui.toJSON()),
            par: 0
        };

        return level;
    }
}