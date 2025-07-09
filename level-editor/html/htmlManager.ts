import { EditorManager } from "../editorManager";
import { EditorScene } from "../scenes/editorScene";
import { createHTML, objTemplates } from "./objTemplates";


export class HTMLManager {
    editorManager: EditorManager;

    objPalette: HTMLDivElement;
    objList: HTMLDivElement;

    playBtn: HTMLButtonElement;
    exportBtn: HTMLButtonElement;
    exportTextarea: HTMLTextAreaElement;

    constructor(editor: EditorManager) {
        this.editorManager = editor;

        this.objPalette = document.querySelector(".object-palette")!;
        this.objList = document.querySelector(".objects-list")!;

        this.playBtn = document.querySelector(".play-btn")!;
        this.exportBtn = document.querySelector(".export-btn")!;
        this.exportTextarea = document.querySelector(".export-text")!;
    }

    init() {
        this.createObjPalette();

        this.playBtn.addEventListener("click", () => this.toPlayMode());
        this.exportBtn.addEventListener("click", () => this.exportLevel());
    }

    private createObjPalette() {
        for (const template of objTemplates) {
            const btn = document.createElement("button");
            btn.textContent = template.name;

            btn.addEventListener("click", () => {
                const editorScene = this.editorManager.scene;

                if (!(editorScene instanceof EditorScene)) return;

                const ui = template.createUI(editorScene.camera.pos.x, editorScene.camera.pos.y, editorScene);
                editorScene.staticUIs.push(ui);

                const create = template.createHTML || createHTML;
                const el = create(ui, template.name, editorScene);
                this.objList.append(el);
            });

            this.objPalette.append(btn);
        }
    }

    private toPlayMode() {
        this.editorManager.togglePlayMode();
    }

    private exportLevel() {
        const scene = this.editorManager.editorScene;
        const data = scene.getLevelData();
        this.exportTextarea.value = JSON.stringify(data);
    }
}