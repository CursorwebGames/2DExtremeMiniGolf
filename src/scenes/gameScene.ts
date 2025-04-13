import { Camera } from "../camera";
import { CCD_STEPS, MAX_SPEED, MIN_INPUT_SPEED, VISUAL_SPEED } from "../config";
import { GameManager } from "../gameManager";
import { getLevel, levelExists, levelToObject } from "../levels/levels";
import { Hole } from "../objects/hole";
import { MainBall } from "../objects/mainBall";
import { Obstacle } from "../objects/obstacle";
import { Scene } from "./scene";
import { SceneManager } from "./sceneManager";

/**
{
    "ball": [34, 16],
    "hole": [350, 148],
    "obstacles": [
        ["Bouncer", [107, 38]],
        ["Bouncer", [45, 86]]
    ],
    "bounds": [[0, 0], [300, 0], [300, 200], [0, 200]],
    "par": 2
},
 */

// TODO: MAKE A LEVEL WITH MULTIPLE BALLS OR JUST GIVE UP WITH THAT IDEA
export class GameScene extends Scene {
    camera: Camera;

    ball: MainBall;
    hole: Hole;

    par: number;
    guideText: string;

    bounds: PointArr;
    obstacles: Obstacle[];

    levelIdx: number;

    constructor(gameManager: GameManager, sceneManager: SceneManager, levelIdx = 3) {
        super(gameManager, sceneManager);

        this.levelIdx = levelIdx;
        const level = getLevel(levelIdx);

        this.ball = new MainBall(...level.ball);
        this.hole = new Hole(...level.hole);

        this.par = level.par;
        this.guideText = level.guideText;

        const bounds = level.bounds;
        this.bounds = bounds;

        this.obstacles = level.obstacles.map(obj => levelToObject(obj));

        let minx = bounds[0][0], miny = bounds[0][1], maxx = bounds[0][0], maxy = bounds[0][1];
        for (let i = 1; i < bounds.length; i++) {
            let [x, y] = bounds[i];
            if (x < minx) minx = x;
            if (y < miny) miny = y;
            if (x > maxx) maxx = x;
            if (y > maxy) maxy = y;
        }
        this.camera = new Camera(this.ball, minx, miny, maxx, maxy);
    }

    draw() {
        background(161, 207, 161);

        push();
        this.drawCamera();
        this.drawBorders();

        for (const staticObj of this.obstacles) {
            staticObj.draw();
        }

        this.hole.draw();
        this.ball.draw();

        this.checkCollisions();

        pop();

        // HUD
        push();
        fill(255);
        stroke(0);
        strokeWeight(3);

        // TODO: fix text sizes
        textAlign(CENTER);
        textSize(30);
        text(this.guideText, width / 2, 50);

        textAlign(LEFT);
        textSize(20);
        text(`Stroke: ${this.gameManager.strokes}\nPar: ${this.par}`, 10, height - 60);
        pop();
    }

    drawBorders() {
        push();
        // the shadow and grass
        fill(94, 230, 83);
        strokeWeight(3);
        stroke(0, 0.25 * 255);
        beginShape();
        for (const [x, y] of this.bounds) {
            vertex(x + 1.5, y + 1.5);
        }
        endShape(CLOSE);

        // the white border
        noFill();
        stroke(255);
        beginShape();
        for (const [x, y] of this.bounds) {
            vertex(x, y);
        }
        endShape(CLOSE);
        pop();
    }

    drawCamera() {
        this.camera.draw();

        if (this.ball.canShoot() && this.ball.dragStart) {
            // 1 / (1 + x), x = [0, 1], [0, 1] ~ [0, MAX_SPEED * VISUAL_SPEED]
            const cameraScale = MAX_SPEED * VISUAL_SPEED / (this.ball.getDir().mag() + MAX_SPEED * VISUAL_SPEED);
            this.camera.scaleTo(cameraScale);
        } else {
            this.camera.scaleTo(1);
        }
    }

    checkCollisions() {
        for (let c = 0; c < CCD_STEPS; c++) {
            this.ball.update(this.bounds, CCD_STEPS);

            for (const obj of this.obstacles) {
                const res = obj.isColliding(this.ball);
                if (res) {
                    obj.collide(this.ball, res);
                }
            }
        }

        this.hole.checkBall(this.ball, () => this.nextLevel());
    }

    nextLevel() {
        if (levelExists(this.levelIdx + 1)) {
            this.sceneManager.setScene(
                new GameScene(this.gameManager, this.sceneManager, this.levelIdx + 1),
                () => this.gameManager.nextLevel()
            );
        } else {
            console.log('finished')
        }
    }

    debugMousePressed(): void {
        const vec = createVector(6.6, 8.7);
        // const vec = p5.Vector.sub(createVector(mousex, mousey), this.ball.pos).div(32);
        console.log("ballPos:", this.ball.pos.toString(), "\n",
            "Vec:", vec.toString(), "\n",
            "\n-----\n");
        this.ball.vel = vec;
    }

    mousePressed(): void {
        if (!this.ball.canShoot()) return;

        this.ball.dragStart = createVector(mouseX, mouseY);
    }

    mouseReleased(): void {
        // either ball in movement, or player hasn't made an input yet
        if (!this.ball.canShoot() || !this.ball.dragStart) return;

        // actual input (without accounting for scaling)
        const dir = this.ball.getDir();
        this.ball.dragStart = null;

        if (dir.mag() < MIN_INPUT_SPEED) return;
        const vec = dir.div(VISUAL_SPEED);

        this.ball.vel = vec;

        this.gameManager.addStroke();
    }

    windowResized(): void {
        this.camera.windowResized();
    }
}
