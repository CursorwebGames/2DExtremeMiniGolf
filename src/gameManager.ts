import { SceneManager } from "./scenes/sceneManager";

/**
 * Manages the score... for now
 */
export class GameManager {
    sceneManager: SceneManager;
    strokes: number;
    totalStrokes: number;

    constructor() {
        this.sceneManager = new SceneManager(this);

        this.strokes = 0;
        this.totalStrokes = 0;
    }

    draw(): void {
        this.sceneManager.draw();
    }

    addStroke() {
        this.strokes++;
        this.totalStrokes++;
    }
}
