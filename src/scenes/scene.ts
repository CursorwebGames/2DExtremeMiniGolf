import { GameManager } from "../gameManager";

export abstract class Scene {
    gameManager: GameManager;

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager;
    }

    /**
     * The draw cycle for the scene
     */
    abstract draw(): void;

    mousePressed() { }
    mouseReleased() { }
}