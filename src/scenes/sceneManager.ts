import { levelExists } from "../levels/levels";
import { GameScene } from "./gameScene";
import { Scene } from "./scene";
import { Transition } from "./transitionManager";

/**
 * Manages levels, scene transitions, statistics
 */
export class SceneManager {
    scene: Scene;
    transitionManager: Transition;
    stats: StatsManager;

    constructor() {
        this.scene = new GameScene(this);
        this.transitionManager = new Transition();
        this.stats = new StatsManager();
    }

    draw() {
        this.scene.draw();
        this.transitionManager.draw();
    }

    nextLevel(strokes: number, nextLevelIdx: number) {
        if (levelExists(nextLevelIdx)) {
            this.transitionManager.transition(() => {
                this.stats.recordLevelStats(strokes);

                const scene = new GameScene(this, nextLevelIdx);
                this.scene = scene;
            });
        } else {
            console.log('finished');
        }
    }
}

class StatsManager {
    holeInOnes: number;
    totalStrokes: number;

    constructor() {
        this.holeInOnes = 0;
        this.totalStrokes = 0;
    }

    recordLevelStats(strokes: number) {
        if (strokes == 1) {
            this.holeInOnes++;
        }

        this.totalStrokes += strokes;
    }
}