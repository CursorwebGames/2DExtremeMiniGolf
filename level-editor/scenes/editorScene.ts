import { GameManager } from "../../src/gameManager";
import { Hole } from "../../src/objects/hole";
import { MainBall } from "../../src/objects/mainBall";
import { Wall } from "../../src/objects/wall";
import { Scene } from "../../src/scenes/scene";
import { SceneManager } from "../../src/scenes/sceneManager";
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

    constructor() {
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

        this.ball = new SingleUI(new MainBall(100, 100), this);
        this.hole = new SingleUI(new Hole(100, 100), this);

        this.staticObjs = [
            new RectUI(new Wall(50, 50, 100, 100), this),
        ];
    }

    draw() {
        background(161, 207, 161);

        this.hole.draw();
        this.ball.draw();

        for (const obj of this.staticObjs) {
            obj.draw();
        }
        // this.levelBounds.draw();
    }

    /** Add knots to the `SceneManager`, as well as register object owner */
    registerKnots(parent: UIComponent, ...knots: Knot[]) {
        for (const knot of knots) {
            knot.parent = parent;
            this.knots.push(knot);
        }
    }

    mousePressed() {
        for (const knot of this.knots) {
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
    }
}