import { GameManager } from "../gameManager";
import { GameScene } from "./gameScene";
import { Scene } from "./scene";

/**
 * Manages levels, scene transitions
 */
export class SceneManager {
    scene: Scene;
    gameManager: GameManager;

    constructor(gameManager: GameManager) {
        this.scene = new GameScene(gameManager);
        this.gameManager = gameManager;
    }

    draw() {
        this.scene.draw();
    }
}