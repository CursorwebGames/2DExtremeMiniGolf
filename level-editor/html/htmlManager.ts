import { getLevel } from "../../src/levels/levels";
import { EditorManager } from "../editorManager";
import { EditorScene } from "../scenes/editorScene";
import { createHTML, objTemplates } from "./objTemplates";


export class HTMLManager {
    editorManager: EditorManager;

    objPalette: HTMLDivElement;
    objList: HTMLDivElement;

    playBtn: HTMLButtonElement;

    editBoundsBtn: HTMLButtonElement;

    exportBtn: HTMLButtonElement;
    exportTextarea: HTMLTextAreaElement;
    copyExportBtn: HTMLButtonElement;

    importIdxInput: HTMLInputElement;
    importLevelBtn: HTMLButtonElement;

    constructor(editor: EditorManager) {
        this.editorManager = editor;

        this.objPalette = document.querySelector(".object-palette")!;
        this.objList = document.querySelector(".objects-list")!;

        this.playBtn = document.querySelector(".play-btn")!;

        this.editBoundsBtn = document.querySelector(".edit-bound-btn")!;

        this.exportBtn = document.querySelector(".export-btn")!;
        this.exportTextarea = document.querySelector(".export-text")!;
        this.copyExportBtn = document.querySelector(".copy-export-btn")!;

        this.importIdxInput = document.querySelector(".import-idx")!;
        this.importLevelBtn = document.querySelector(".import-level")!;
    }

    init() {
        this.createObjPalette();

        this.playBtn.addEventListener("click", () => {
            this.editorManager.togglePlayMode();
        });

        this.editBoundsBtn.addEventListener("click", () => {
            const scene = this.editorManager.scene;
            if (scene instanceof EditorScene) {
                scene.currEditPolygon = scene.levelBounds;
            }
        });

        this.exportBtn.addEventListener("click", () => this.exportLevel());
        this.copyExportBtn.addEventListener("click", async () => await this.copyExport());

        this.importLevelBtn.addEventListener("click", () => this.importLevel());
    }

    private createObjPalette() {
        for (const template of objTemplates) {
            const btn = document.createElement("button");
            btn.textContent = template.name;

            btn.addEventListener("click", () => {
                const editorScene = this.editorManager.scene;

                if (!(editorScene instanceof EditorScene)) return;

                const ui = template.createUI(editorScene.camera.pos.x, editorScene.camera.pos.y, editorScene);
                editorScene.obstacleUIs.push(ui);

                const create = template.createHTML || createHTML;
                const el = create(ui, template.name, editorScene);
                this.objList.append(el);
            });

            this.objPalette.append(btn);
        }
    }

    private exportLevel() {
        const scene = this.editorManager.editorScene;
        const data = scene.getLevelData();

        let out = `{
    "ball": ${this.formatJSON(data.ball)},
    "hole": ${this.formatJSON(data.hole)},
    "obstacles": ${this.formatJSON(data.obstacles)},
    "bounds": ${this.formatJSON(data.bounds)},
    "par": 0
},`;

        this.exportTextarea.value = out;
    }

    private importLevel() {
        const levelIdx = Number(this.importIdxInput.value);
        const level = getLevel(levelIdx);

        // guarantee that we are in editorScene
        if (!(this.editorManager.scene instanceof EditorScene)) {
            this.editorManager.togglePlayMode();
        }

        const scene = this.editorManager.scene as EditorScene;
        if (level) {
            scene.importLevel(level);
        }
    }

    private formatJSON(json: object) {
        return JSON.stringify(json)
            .replace(/:/g, ": ")
            .replace(/,/g, ", ");
    }

    private async copyExport() {
        const text = this.exportTextarea.value;
        await navigator.clipboard.writeText(text);

        this.copyExportBtn.textContent = "Copied!";

        setTimeout(() => {
            this.copyExportBtn.textContent = "Copy";
        }, 1000);
    }
}