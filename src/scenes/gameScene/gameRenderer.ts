import { Camera } from "../../camera";
import { CCD_STEPS, MAX_SPEED, MIN_INPUT_SPEED, VISUAL_SPEED } from "../../config";
import { LevelData, levelToObject } from "../../levels/levels";
import { Hole } from "../../objects/hole";
import { MainBall } from "../../objects/mainBall";
import { Obstacle } from "../../objects/obstacle";

export class GameRenderer {
    nextLevel: () => void;

    camera: Camera;

    ball: MainBall;
    hole: Hole;

    par: number;
    guideText: string;

    strokes: number;

    bounds: PointArr;
    obstacles: Obstacle[];

    constructor(level: LevelData, nextLevel: () => void) {
        this.nextLevel = nextLevel;
        this.strokes = 0;

        this.ball = new MainBall(...level.ball);
        this.hole = new Hole(...level.hole);

        this.par = level.par;
        this.guideText = level.guideText || "";

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
        this.drawGround();

        for (const staticObj of this.obstacles) {
            staticObj.draw();
        }

        this.hole.draw();
        this.ball.draw();

        this.drawBorders();

        this.checkCollisions();
        // CAMERA DEBUGGING THING
        // let abs: Camera | Camera['absBounds'] = this.camera;
        // push();
        // noFill();
        // strokeWeight(1);
        // stroke('red');
        // rect(abs.minx, abs.miny, abs.maxx - abs.minx, abs.maxy - abs.miny);

        // abs = this.camera.absBounds;
        // stroke('black');
        // rect(abs.minx, abs.miny, abs.maxx - abs.minx, abs.maxy - abs.miny);

        // stroke('blue');
        // strokeWeight(5);
        // point(this.camera.pos.x, this.camera.pos.y);
        // pop();

        pop();

        // push(); {
        //     translate(width / 2, height / 2);
        //     scale(this.camera.aspectScale);
        //     stroke('white');
        //     let w = ASPECT_WIDTH;
        //     let h = ASPECT_HEIGHT;
        //     rect(- w / 2 + 1, - h / 2 + 1, w - 2, h - 2);
        // } pop(); 

        this.drawHUD();
    }

    private drawGround() {
        push();
        // the shadow and grass
        fill(55, 204, 43);
        strokeWeight(3);
        stroke(0, 0.25 * 255);
        beginShape();
        for (const [x, y] of this.bounds) {
            vertex(x + 1.5, y + 1.5);
        }
        endShape(CLOSE);
        pop();
    }

    /** Draw the white border (it should cover shadows, and so "connect" walls) */
    private drawBorders() {
        push();
        noFill();
        strokeWeight(3);
        stroke(255);
        beginShape();
        for (const [x, y] of this.bounds) {
            vertex(x, y);
        }
        endShape(CLOSE);
        pop();
    }

    private drawCamera() {
        this.camera.draw();

        if (this.ball.canShoot() && this.ball.dragStart) {
            // 1 / (1 + x); x = [0, 1]; [0, 1] ~ [0, MAX_SPEED * VISUAL_SPEED]
            const cameraScale = MAX_SPEED * VISUAL_SPEED / (this.ball.getDir().mag() + MAX_SPEED * VISUAL_SPEED);
            this.camera.scaleTo(cameraScale);
        } else {
            this.camera.scaleTo(1);
        }
    }

    private drawHUD() {
        push();
        fill(255);
        stroke(0);
        strokeWeight(3);

        // todo: on small screens, text size is not scaled properly
        textAlign(CENTER);
        textSize(30);
        text(this.guideText, 0, 50, width);

        textAlign(LEFT);
        textSize(20);
        text(`Stroke: ${this.strokes}\nPar: ${this.par}`, 10, height - 60);
        pop();
    }

    private checkCollisions() {
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

        this.strokes++;
    }

    windowResized(): void {
        this.camera.windowResized();
    }
}