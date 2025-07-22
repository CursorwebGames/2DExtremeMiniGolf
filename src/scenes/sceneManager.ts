import { levelExists } from "../levels/levels";
import { EndScene } from "./endScene";
import { GameScene } from "./gameScene";
// import { MenuScene } from "./menuScene";
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
        this.scene = new GameScene(this, 7)///new MenuScene(this);
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

    nextLevel(levelStats: LevelStats, nextLevelIdx: number) {
        this.stats.recordLevelStats(levelStats);
        if (levelExists(nextLevelIdx)) {
            const scene = new GameScene(this, nextLevelIdx);
            this.setScene(scene);
        } else {
            const scene = new EndScene(this);
            this.setScene(scene);
        }
    }
}


/**
 * Statistics given to StatsManager at the completion of each level
 */
export interface LevelStats {
    strokes: number;
    retries: number;
}

class StatsManager {
    holeInOnes: number;
    totalStrokes: number;
    retries: number;

    constructor() {
        this.holeInOnes = 0;
        this.totalStrokes = 0;
        this.retries = 0;
    }

    recordLevelStats({ strokes, retries }: LevelStats) {
        if (strokes == 1) {
            this.holeInOnes++;
        }

        this.retries += retries;
        this.totalStrokes += strokes;
    }
}