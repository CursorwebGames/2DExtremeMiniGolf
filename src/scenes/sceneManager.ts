import { GameManager } from "../gameManager";
import { getLevel } from "../levels/levels";
import { GameScene } from "./gameScene";
import { Scene } from "./scene";

/**
 * Manages levels, scene transitions
 */
export class SceneManager {
    scene: Scene;
    gameManager: GameManager;

    constructor(gameManager: GameManager) {
        const level = getLevel(1);
        this.scene = new GameScene(gameManager, level!);
        this.gameManager = gameManager;
    }

    draw() {
        this.scene.draw();
    }
}
