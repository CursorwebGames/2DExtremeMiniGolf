import { LevelData } from "../../src/levels/levels";
import { GameRenderer } from "../../src/scenes/gameScene/gameRenderer";
import { Scene } from "../../src/scenes/scene";
import { EditorManager } from "../editorManager";

export class PlayScene extends Scene {
    editorManager: EditorManager;
    gameRenderer: GameRenderer;

    constructor(level: LevelData, editorManager: EditorManager) {
        super();
        this.gameRenderer = new GameRenderer(level, () => this.nextLevel());
        this.editorManager = editorManager;
    }

    draw(): void {
        this.gameRenderer.draw();
    }

    nextLevel(): void {
        this.editorManager.completedPlayMode();
    }

    mousePressed() {
        this.gameRenderer.mousePressed();
    }

    mouseReleased() {
        this.gameRenderer.mouseReleased();
    }
}