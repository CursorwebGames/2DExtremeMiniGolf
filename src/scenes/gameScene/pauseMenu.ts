import { GameScene } from ".";

export class PauseMenu {
    gameScene: GameScene;

    constructor(gameScene: GameScene) {
        this.gameScene = gameScene;
    }

    draw() {
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
}