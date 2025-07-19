import { getLevel } from "../../levels/levels";
import { Scene } from "../scene";
import { SceneManager } from "../sceneManager";
import { GameRenderer } from "./gameRenderer";
import { PauseMenu } from "./pauseMenu";

/**
{
    "ball": [34, 16],
    "hole": [350, 148],
    "obstacles": [
        ["Bouncer", [107, 38]],
        ["Bouncer", [45, 86]]
    ],
    "bounds": [[0, 0], [300, 0], [300, 200], [0, 200]],
    "par": 2
},
 */

// TODO: MAKE A LEVEL WITH MULTIPLE BALLS OR JUST GIVE UP WITH THAT IDEA
export class GameScene extends Scene {
    sceneManager: SceneManager;
    gameRenderer: GameRenderer;
    pauseMenu: PauseMenu;

    retries: number;

    levelIdx: number;

    constructor(sceneManager: SceneManager, levelIdx = 0) {
        super();
        this.sceneManager = sceneManager;
        this.gameRenderer = new GameRenderer(getLevel(levelIdx), () => this.nextLevel());
        this.pauseMenu = new PauseMenu(this);

        this.retries = 0;

        this.levelIdx = levelIdx;
    }

    draw() {
        this.gameRenderer.draw();
        this.pauseMenu.draw();
    }

    nextLevel() {
        this.sceneManager.nextLevel({
            strokes: this.gameRenderer.strokes,
            retries: this.retries
        }, this.levelIdx + 1);
    }

    restartLevel() {
        this.gameRenderer = new GameRenderer(getLevel(this.levelIdx), () => this.nextLevel());
        this.retries++;
    }

    mousePressed(): void {
        this.pauseMenu.mousePressed();
        if (!this.pauseMenu.isPaused) {
            this.gameRenderer.mousePressed();
        }
    }

    mouseReleased(): void {
        if (!this.pauseMenu.isPaused) {
            this.gameRenderer.mouseReleased();
        }
    }

    keyPressed(): void {
        this.pauseMenu.keyPressed();
    }

    windowResized(): void {
        this.pauseMenu.windowResized();
        this.gameRenderer.windowResized();
    }
}
