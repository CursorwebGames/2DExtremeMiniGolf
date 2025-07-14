import { getLevel, LevelData } from "../../levels/levels";
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

    isPaused: boolean;

    levelIdx: number;

    constructor(sceneManager: SceneManager, levelIdx = 0) {
        super();
        this.sceneManager = sceneManager;
        this.gameRenderer = new GameRenderer(this);
        this.pauseMenu = new PauseMenu(this);

        this.levelIdx = levelIdx;

        this.isPaused = !false;

        this.loadLevel(getLevel(levelIdx));
    }

    /** This method lets the editor inject custom code */
    loadLevel(level: LevelData | null) {
        this.gameRenderer.loadLevel(level);
    }

    draw() {
        this.gameRenderer.draw();

        if (this.isPaused) {
            this.pauseMenu.draw();
        }
    }


    nextLevel() {
        this.sceneManager.nextLevel(this.gameRenderer.strokes, this.levelIdx + 1);
    }

    mousePressed(): void {
        if (this.isPaused) {
        } else {
            this.gameRenderer.mousePressed();
        }
    }

    mouseReleased(): void {
        if (this.isPaused) {
        } else {
            this.gameRenderer.mouseReleased();
        }
    }

    keyPressed(): void {
        if (key == "Escape") {
            this.isPaused = !this.isPaused;

            // todo: pause updating
            if (this.isPaused) {
                this.gameRenderer.ball.dragStart = null;
            }
        }
    }

    windowResized(): void {
        this.gameRenderer.windowResized();
    }
}
