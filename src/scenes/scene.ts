import { GameManager } from "../gameManager";
import { SceneManager } from "./sceneManager";

// todo: do you even need to specify the constructor?
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
    mouseWheel(_e: WheelEvent) { }

    keyPressed() { }

    windowResized() { }
}