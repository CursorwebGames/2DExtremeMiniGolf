import { GameManager } from "../gameManager";

export abstract class Scene {
    gameManager: GameManager;

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager;
    }

    /**
     * The actual draw cycle for the scene
     */
    protected abstract _draw(): void;

    mousePressed() { }
    mouseReleased() { }

    draw() {
        this._draw();
    }
}