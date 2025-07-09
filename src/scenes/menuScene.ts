import { GameScene } from "./gameScene";
import { Scene } from "./scene";
import { SceneManager } from "./sceneManager";

export class MenuScene extends Scene {
    sceneManager: SceneManager

    constructor(sceneManager: SceneManager) {
        super();
        this.sceneManager = sceneManager;
    }

    draw() {
        background(123, 255, 123);

        push();
        textSize(100);
        textAlign(CENTER);
        textStyle(BOLD);
        fill(255, 132, 43);
        strokeWeight(16);
        stroke(191, 0, 0);
        text("ector Golf", width / 2, 100);

        strokeWeight(8);
        stroke(191, 150, 0);
        if (sqrt((mouseX - width / 2) ** 2 + (mouseY - height / 2) ** 2) < 100) {
            fill(255, 240, 79);
        } else {
            fill(255, 217, 0);
        }
        circle(width / 2, height / 2, 200);
        fill(191, 150, 0);
        noStroke();
        triangle(width / 2 - 30, height / 2 - 30 - 16, width / 2 - 30, height / 2 + 30 + 16, width / 2 + 30 + 16, height / 2);
        pop();
    }

    mouseReleased() {
        if (sqrt((mouseX - width / 2) ** 2 + (mouseY - height / 2) ** 2) < 100) {
            const scene = new GameScene(this.sceneManager);
            this.sceneManager.setScene(scene);
        }
    }
}