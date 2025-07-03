import { GameManager } from "../gameManager";
import { GameScene } from "./gameScene";
import { Scene } from "./scene";
import { Transition } from "./transitionManager";

/**
 * Manages levels, scene transitions
 * @todo In the future, scene manager will also manage the menu
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

    /**
     * @param callback Extra logic (such as resetting stroke count)
     */
    setScene(scene: Scene, callback = () => { }) {
        this.transitionManager.transition(() => {
            this.scene = scene;
            callback();
        });
    }
}
