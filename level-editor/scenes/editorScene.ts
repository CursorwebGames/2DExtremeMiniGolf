import { GameManager } from "../../src/gameManager";
import { Hole } from "../../src/objects/hole";
import { MainBall } from "../../src/objects/mainBall";
import { Wall } from "../../src/objects/wall";
import { Scene } from "../../src/scenes/scene";
import { SceneManager } from "../../src/scenes/sceneManager";
import { EditorCamera } from "../editorCamera";
import { Knot } from "../ui/knot";
import { RectUI } from "../ui/rectUI";
import { SingleUI } from "../ui/singleUI";
import { UIComponent } from "../ui/UIComponent";

export class EditorScene extends Scene {
    // level: LevelData;
    knots: Knot[];

    ball: SingleUI;
    hole: SingleUI;
    staticObjs: UIComponent[];
    currEditPolygon: null;

    camera: EditorCamera;

    constructor() {
        /* super hack: we don't have game managers or scene managers */
        super(null as unknown as GameManager, null as unknown as SceneManager);
        // this.level = {
        //     ball: [100, 100],
        //     hole: [50, 50],
        //     bounds: [
        //         [0, 0],
        //         [width, 0],
        //         [width, height],
        //         [0, height]
        //     ],
        //     obstacles: [],
        //     guideText: "",
        //     par: 0
        // };
        this.knots = [];

        this.hole = new SingleUI(new Hole(100, 100), this);
        this.ball = new SingleUI(new MainBall(100, 100), this);

        this.staticObjs = [
            new RectUI(new Wall(50, 50, 100, 100), this),
        ];

        this.currEditPolygon = null;
        this.camera = new EditorCamera();
    }

    draw() {
        this.camera.draw();
        background(161, 207, 161);
        // this.levelBounds.draw();
        this.camera.drawGrid();

        this.hole.draw();
        this.ball.draw();

        for (const obj of this.staticObjs) {
            obj.draw();
        }
    }

    /** Add knots to the `SceneManager`, as well as register object owner */
    registerKnots(parent: UIComponent, ...knots: Knot[]) {
        for (const knot of knots) {
            knot.parent = parent;
            this.knots.push(knot);
        }
    }

    mousePressed() {
        if (mouseButton == CENTER) {
            this.camera.beginMove();
            return;
        }

        for (let i = this.knots.length - 1; i >= 0; i--) {
            const knot = this.knots[i];
            if (knot.mouseOver()) {
                knot.startDrag();
                return;
            }
        }
    }

    mouseDragged() {
        for (const knot of this.knots) {
            if (knot.dragStart) {
                knot.drag();
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
}