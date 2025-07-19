import { getLevel, nameToObj } from "../../src/levels/levels";
import { Obstacle } from "../../src/objects/obstacle";
import { EditorManager } from "../editorManager";
import { EditorScene } from "../scenes/editorScene";
import { nameToUI } from "../ui/nameToUI";
import { ObjListItem } from "./objListItem";
import { objToItem, paletteSwatches } from "./objPalette";


export class HTMLManager {
    editorManager: EditorManager;

    objPaletteEl: HTMLDivElement;
    objListEl: HTMLDivElement;

    playBtn: HTMLButtonElement;

    editBoundsBtn: HTMLButtonElement;

    exportBtn: HTMLButtonElement;
    exportTextarea: HTMLTextAreaElement;
    copyExportBtn: HTMLButtonElement;

    importIdxInput: HTMLInputElement;
    importLevelBtn: HTMLButtonElement;

    objListItems: ObjListItem[];

    constructor(editor: EditorManager) {
        this.editorManager = editor;

        this.objPaletteEl = document.querySelector(".object-palette")!;
        this.objListEl = document.querySelector(".objects-list")!;

        this.playBtn = document.querySelector(".play-btn")!;

        this.editBoundsBtn = document.querySelector(".edit-bound-btn")!;

        this.exportBtn = document.querySelector(".export-btn")!;
        this.exportTextarea = document.querySelector(".export-text")!;
        this.copyExportBtn = document.querySelector(".copy-export-btn")!;

        this.importIdxInput = document.querySelector(".import-idx")!;
        this.importLevelBtn = document.querySelector(".import-level")!;

        this.objListItems = [];
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
        for (const element of paletteSwatches) {
            const btn = document.createElement("button");
            btn.textContent = element.name;

            btn.addEventListener("click", () => {
                const editorScene = this.editorManager.scene;

                if (!(editorScene instanceof EditorScene)) return;

                const ui = element.createUI(editorScene.camera.pos.x, editorScene.camera.pos.y, editorScene);
                const CreateItemClass = element.ItemClass || ObjListItem;

                this.objListItems.push(new CreateItemClass(ui, element.name, this));
            });

            this.objPaletteEl.append(btn);
        }
    }

    removeItem(item: ObjListItem) {
        const idx = this.objListItems.indexOf(item);
        this.objListItems.splice(idx, 1);
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

    /**
     * Loads `obstacles`
     */
    private importLevel() {
        const levelIdx = Number(this.importIdxInput.value);
        const level = getLevel(levelIdx);

        // guarantee that we are in editorScene
        if (!(this.editorManager.scene instanceof EditorScene)) {
            this.editorManager.togglePlayMode();
        }

        const scene = this.editorManager.scene as EditorScene;
        if (level) {
            for (const item of this.objListItems) {
                item.remove();
            }

            scene.importLevel(level);

            for (const [name, args] of level.obstacles) {
                const UIClass = nameToUI[name];
                const ObjClass = nameToObj[name] as new (...p: typeof args) => Obstacle;
                const { itemName, ItemClass } = objToItem[name];

                const obstacleUI = new UIClass(new ObjClass(...args), scene);
                console.log(obstacleUI);

                this.objListItems.push(new ItemClass(obstacleUI, itemName, this));
            }
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