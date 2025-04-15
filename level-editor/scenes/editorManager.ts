import { Scene } from "../../src/scenes/scene";
import { EditorScene } from "./editorScene";

export class EditorManager {
    scene: Scene;
    constructor() {
        this.scene = new EditorScene();
    }

    draw() {
        this.scene.draw();
    }
}