import { LevelData } from "../../src/levels/levels";
import { GameScene } from "../../src/scenes/gameScene";
import { SceneManager } from "../../src/scenes/sceneManager";
import { EditorManager } from "../editorManager";

export class PlayScene extends GameScene {
    editorManager: EditorManager;

    constructor(level: LevelData, editorManager: EditorManager) {
        super(null as unknown as SceneManager, 0);
        this.loadLevel(level);
        this.editorManager = editorManager;
    }

    nextLevel(): void {
        this.editorManager.completedPlayMode();
    }
}