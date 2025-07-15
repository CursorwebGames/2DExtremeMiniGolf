import { GameScene } from ".";
import { pointRectCol } from "../../collisions";

export class PauseMenu {
    gameScene: GameScene;
    isPaused: boolean;

    constructor(gameScene: GameScene) {
        this.gameScene = gameScene;
        this.isPaused = false;
    }

    draw() {
        if (this.isPaused) {
            this.drawPauseOverlay();
        } else {
            this.drawPauseUI();
        }
    }

    private drawPauseUI() {
        push();
        // fill(255, 0, 0);
        // rect(width - 40, 10, 30, 30);
        if (pointRectCol(mouseX, mouseY, width - 40, 10, 30, 30)) {
            fill(180);
        } else {
            fill(255);
        }
        strokeWeight(4);
        stroke(0);
        rect(width - 40, 10, 10, 30);
        rect(width - 20, 10, 10, 30);
        pop();
    }

    private drawPauseOverlay() {
        push();
        noStroke();
        fill(0, 200);
        rect(0, 0, width, height);

        textSize(60);
        fill(255);
        strokeWeight(3);
        stroke(100);
        textAlign(CENTER);
        text("PAUSED", width / 2, 100);
        pop();
    }

    keyPressed() {
        if (key == "Escape") {
            this.isPaused = !this.isPaused;

            // todo: pause updating
            if (this.isPaused) {
                this.gameScene.gameRenderer.ball.dragStart = null;
            }
        }
    }

    mousePressed() {
        if (!this.isPaused) {
            if (pointRectCol(mouseX, mouseY, width - 40, 10, 30, 30)) {
                this.isPaused = true;
            }
        }
    }
}