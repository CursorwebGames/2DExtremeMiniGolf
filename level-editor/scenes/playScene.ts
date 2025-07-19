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
        throw new Error("Method not implemented.");
    }

    nextLevel(): void {
        this.editorManager.completedPlayMode();
    }
}