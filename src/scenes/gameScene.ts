import { Camera } from "../camera";
import { CCD_STEPS } from "../config";
import { GameManager } from "../gameManager";
import { MainBall } from "../objects/mainBall";
import { Scene } from "./scene";

export class GameScene extends Scene {
    camera: Camera;
    ball: MainBall;

    constructor(gameManager: GameManager) {
        super(gameManager);
        // TODO: MAKE A LEVEL WITH MULTIPLE BALLS OR JUST GIVE UP WITH THAT IDEA
        this.ball = new MainBall(width / 2, height / 2);
        this.camera = new Camera(this.ball, 0, 0, width, height);
    }

    protected _draw(): void {
        background(123, 255, 123);

        push();
        this.camera.draw();

        push();
        fill(94, 230, 83);
        strokeWeight(3);
        stroke(255);
        rect(0, 0, width, height);
        pop();

        this.ball.draw();
        pop();

        this.checkCollisions();
    }

    checkCollisions() {
        for (let c = 0; c < CCD_STEPS; c++) {
            this.ball.update(CCD_STEPS);

            // for (const obj of this.staticObjs) {
            //     const res = obj.isColliding(ball);
            //     if (res) {
            //         obj.collide(ball, res);
            //     }
            // }
        }
    }

    mousePressed(): void {
        if (this.ball.inHole || this.ball.vel.mag() != 0) return;
        this.ball.dragStart = createVector(mouseX, mouseY);
    }

    mouseReleased(): void {
        if (!this.ball.dragStart) return;

        const vec = this.ball.getDir().div(30);
        this.ball.dragStart = null;

        if (this.ball.vel.mag() != 0) return;
        this.ball.vel = vec;

        this.gameManager.addStroke();
    }
}
