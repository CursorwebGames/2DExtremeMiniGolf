import { Scene } from "../src/scenes/scene";
import { HTMLUIManager } from "./dom-ui/htmlUIManager";
import { EditorScene } from "./scenes/editorScene";

export class EditorManager {
    scene: Scene;
    htmlUI: HTMLUIManager;

    constructor() {
        this.scene = new EditorScene();

        this.htmlUI = new HTMLUIManager(this);
        this.htmlUI.init();
    }

    draw() {
        this.scene.draw();
    }
}