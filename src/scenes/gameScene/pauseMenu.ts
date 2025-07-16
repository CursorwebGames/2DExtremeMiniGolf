import { GameScene } from ".";
import { BtnRectArea } from "../../buttons/btnArea";
import { Button } from "../../buttons/button";
import { MenuBtn } from "../../buttons/menuBtn";

let frate = 0;

export class PauseMenu {
    gameScene: GameScene;
    isPaused: boolean;

    pauseBtnArea!: BtnRectArea;
    optionBtns!: Button[];

    constructor(gameScene: GameScene) {
        this.gameScene = gameScene;
        this.isPaused = false;

        this.initBtns();
    }

    initBtns() {
        // strokeWeight = 4, width = 30, gap = 10
        this.pauseBtnArea = new BtnRectArea(width - 30 - 10 - 2, 10 - 2, 30 + 4, 30 + 4);
        this.optionBtns = [
            new MenuBtn("Resume", width / 2, height / 4 + 50, () => {
            }),
            new MenuBtn("Restart", width / 2, height / 4 + 140, () => {
                this.gameScene.restartLevel();
            })
        ];
    }

    draw() {
        fill(255);
        textSize(50);
        if (frameCount % 5 == 0) {
            frate = frameRate();
        }
        text(frate.toFixed(), 0, 50);
        if (this.isPaused) {
            this.drawPauseOverlay();
        } else {
            this.drawPauseUI();
        }
    }

    private drawPauseUI() {
        push();
        if (this.pauseBtnArea.mouseOver()) {
            fill(180);
        } else {
            fill(255);
        }
        strokeWeight(4);
        stroke(0);
        rect(width - 30, 10, 10, 20);
        rect(width - 20, 10, 10, 20);
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

        textSize(30);
        text(`level: ${this.gameScene.levelIdx}`, width / 2, height / 2 - 200);

        for (const btn of this.optionBtns) {
            btn.draw();
        }
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
            if (this.pauseBtnArea.mouseOver()) {
                this.isPaused = true;
            }
        } else {
            for (const btn of this.optionBtns) {
                if (btn.mouseOver()) {
                    btn.onClick();
                }
            }
            this.isPaused = false;
        }
    }

    windowResized() {
        this.initBtns();
    }
}
