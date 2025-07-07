import { Hole } from "../../src/objects/hole";
import { MainBall } from "../../src/objects/mainBall";
import { PolygonWall } from "../../src/objects/polygonWall";
import { Scene } from "../../src/scenes/scene";

import { EditorCamera } from "../editorCamera";

import { Knot } from "../canvas-ui/knot";
import { LevelBoundsUI } from "../canvas-ui/levelBoundsUI";
import { PolygonComponent } from "../canvas-ui/PolygonComponent";
import { PolygonUI } from "../canvas-ui/polygonUI";
import { SingleUI } from "../canvas-ui/singleUI";
import { UIComponent } from "../canvas-ui/UIComponent";
import { TeleporterUI } from "../canvas-ui/teleporterUI";
import { Teleporter } from "../../src/objects/teleporter";


export class EditorScene extends Scene {
    // level: LevelData;
    knots: Knot[];

    ball: SingleUI;
    hole: SingleUI;
    staticObjs: UIComponent[];
    currEditPolygon: PolygonComponent | null;

    camera: EditorCamera;
    levelBounds: LevelBoundsUI;

    constructor() {
        super();
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

        /* careful the order! Will affect how knots are added */
        this.levelBounds = new LevelBoundsUI(this);

        this.hole = new SingleUI(new Hole(100, 100), this);
        this.ball = new SingleUI(new MainBall(100, 100), this);

        this.staticObjs = [
            // new RectUI(new Wall(50, 50, 100, 100), this),
            // new PolygonUI(new PolygonWall([
            //     [130, 130],
            //     [200, 170],
            //     [180, 250]
            // ]), this),
            new TeleporterUI(new Teleporter(0, 0, 30, 30), this),
        ];

        this.camera = new EditorCamera();

        this.currEditPolygon = null;
    }

    draw() {
        background(161, 207, 161);

        push();
        this.camera.draw();
        this.levelBounds.draw();
        this.camera.drawGrid();

        this.hole.draw();
        this.ball.draw();

        for (const obj of this.staticObjs) {
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
}