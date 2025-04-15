import { GameManager } from "../gameManager";
import { SceneManager } from "./sceneManager";

export abstract class Scene {
    gameManager: GameManager;
    sceneManager: SceneManager;

    constructor(gameManager: GameManager, sceneManager: SceneManager) {
        this.gameManager = gameManager;
        this.sceneManager = sceneManager;
    }

    /**
     * The draw cycle for the scene
     */
    abstract draw(): void;

    mousePressed() { }
    mouseReleased() { }
    mouseDragged() { }

    windowResized() { }
}