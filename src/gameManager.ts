import { SceneManager } from "./scenes/sceneManager";

/**
 * Manages the score and that's it... for now
 */
export class GameManager {
    sceneManager: SceneManager;

    holeInOnes: number;
    strokes: number;
    totalStrokes: number;

    constructor() {
        this.sceneManager = new SceneManager(this);

        this.holeInOnes = 0;
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

    nextLevel() {
        if (this.strokes == 1) {
            this.holeInOnes++;
        }

        this.strokes = 0;
    }
}
