import { Scene } from "./scene";
import { SceneManager } from "./sceneManager";

export class EndScene extends Scene {
    sceneManager: SceneManager;

    constructor(sceneManager: SceneManager) {
        super();
        this.sceneManager = sceneManager;
    }

    draw() {
        background(123, 255, 123);

        textSize(80);
        textStyle(NORMAL);
        textAlign(CENTER);
        fill(39, 58, 227);
        strokeWeight(4);
        stroke(17, 33, 171);
        text("You beat the game!", width / 2, 100);

        textSize(30);
        fill(237, 153, 57);
        stroke(189, 121, 43);
        text("Thanks for playing!\nCredits: Coder100", width / 2, 500);

        strokeWeight(8);
        stroke(191, 150, 0);
        fill(255, 240, 79);
        rect(width / 2 - 300, height / 2 - 100, 600, 160);//500);

        fill(201, 167, 64);
        textSize(50);
        textStyle(BOLD);
        textAlign(LEFT);
        noStroke();
        text("STATS", width / 2 - 300 + 16, height / 2 - 100 + 16 + 40);

        const stats = this.sceneManager.stats;

        textSize(25);
        textStyle(NORMAL);
        text(`Total strokes: ${stats.totalStrokes}
Hole in ones: ${stats.holeInOnes}`, width / 2 - 300 + 16, height / 2 - 100 + 16 + 80);
    }
}