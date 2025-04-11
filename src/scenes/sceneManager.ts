import { GameManager } from "../gameManager";
import { GameScene } from "./gameScene";
import { Scene } from "./scene";
import { Transition } from "./transitionManager";

/**
 * Manages levels, scene transitions
 */
export class SceneManager {
    scene: Scene;
    gameManager: GameManager;
    transitionManager: Transition;

    constructor(gameManager: GameManager) {
        this.scene = new GameScene(gameManager, this);
        this.gameManager = gameManager;
        this.transitionManager = new Transition();
    }

    draw() {
        this.scene.draw();
        this.transitionManager.draw();
    }

    setScene(scene: Scene) {
        this.transitionManager.transition(() => {
            this.scene = scene;
        });
    }
}
