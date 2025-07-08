import { Scene } from "../src/scenes/scene";
import { HTMLManager } from "./html/htmlManager";
import { EditorScene } from "./scenes/editorScene";

export class EditorManager {
    scene: Scene;
    htmlManager: HTMLManager;

    constructor() {
        this.scene = new EditorScene();

        this.htmlManager = new HTMLManager(this);
        this.htmlManager.init();
    }

    draw() {
        this.scene.draw();
    }
}