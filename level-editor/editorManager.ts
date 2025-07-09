import { Scene } from "../src/scenes/scene";
import { Transition } from "../src/scenes/transitionManager";
import { HTMLManager } from "./html/htmlManager";
import { EditorScene } from "./scenes/editorScene";
import { PlayScene } from "./scenes/playScene";

export class EditorManager {
    scene: Scene;
    htmlManager: HTMLManager;

    /**
     * We want to permanently hold a reference to `editorScene`
     * so we can still use it after playtesting
     */
    editorScene: EditorScene;

    transitionManager: Transition;

    constructor() {
        this.editorScene = new EditorScene();
        this.scene = this.editorScene;

        this.htmlManager = new HTMLManager(this);
        this.htmlManager.init();

        this.transitionManager = new Transition();
    }

    draw() {
        this.scene.draw();
        this.transitionManager.draw();
    }

    togglePlayMode() {
        if (this.scene instanceof EditorScene) {
            const level = this.scene.getLevelData();
            this.scene = new PlayScene(level, this);
        } else {
            this.scene = this.editorScene;
        }
    }

    completedPlayMode() {
        this.transitionManager.transition(() => {
            this.scene = this.editorScene;
        });
    }
}