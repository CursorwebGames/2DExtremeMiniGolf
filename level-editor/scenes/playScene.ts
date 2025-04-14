import { GameManager } from "../../src/gameManager";
import { LevelData } from "../../src/levels/levels";
import { GameScene } from "../../src/scenes/gameScene";
import { SceneManager } from "../../src/scenes/sceneManager";

export class PlayScene extends GameScene {
    constructor(level: LevelData) {
        super(null as unknown as GameManager, null as unknown as SceneManager, 0);
        this.loadLevel(level);
    }

    nextLevel(): void {
        console.log('todo');
    }
}