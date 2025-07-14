import { levelExists } from "../levels/levels";
import { EndScene } from "./endScene";
import { GameScene } from "./gameScene";
import { MenuScene } from "./menuScene";
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
        this.scene = new MenuScene(this);
        this.transitionManager = new Transition();
        this.stats = new StatsManager();
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

    nextLevel(strokes: number, nextLevelIdx: number) {
        this.stats.recordLevelStats(strokes);
        if (levelExists(nextLevelIdx)) {
            const scene = new GameScene(this, nextLevelIdx);
            this.setScene(scene);
        } else {
            const scene = new EndScene(this);
            this.setScene(scene);
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