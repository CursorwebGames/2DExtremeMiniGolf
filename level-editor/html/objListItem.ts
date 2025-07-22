import { Slope } from "../../src/objects/slope";
import { EditorManager } from "../editorManager";
import { EditorScene } from "../scenes/editorScene";
import { PolygonUI } from "../ui/polygonUI";
import { RectUI } from "../ui/rectUI";
import { UISerializable } from "../ui/UIComponent";
import { HTMLManager } from "./htmlManager";

/**
 * Goal: this is the entrypoint you make a `UISerializable`.
 * It will add it to the object list, as well as remove it
 * 
 * A palette contains swatches that the user can choose to create an Item that manages HTML and UI  
 * HTML (dom) + UI (canvas) = Item
 */
export class ObjListItem {
    ui: UISerializable;
    editorManager: EditorManager;

    html: HTMLDivElement;
    htmlManager: HTMLManager;

    /**
     * **NOTE**: make sure the current scene is `EditorScene` when instantiated!
     */
    constructor(ui: UISerializable, name: string, htmlManager: HTMLManager) {
        this.ui = ui;
        this.htmlManager = htmlManager;
        const scene = htmlManager.editorManager.scene as EditorScene;
        this.editorManager = htmlManager.editorManager;

        // html
        this.html = this.createCont(name);
        htmlManager.objListEl.append(this.html);

        // ui
        scene.obstacleUIs.push(ui);
    }

    /**
     * Computed value because scene can change
     * (and we don't want to hold a specific ref)
     */
    get scene() {
        return this.editorManager.scene;
    }

    createCont(name: string) {
        const el = document.createElement("div");

        // simple user label that doesn't really mean anything
        const nameInput = document.createElement("input");
        nameInput.value = name;

        const delBtn = document.createElement("button");
        delBtn.innerHTML = "&times;";
        delBtn.addEventListener("click", () => this.remove());

        el.append(nameInput, delBtn);
        return el;
    }

    remove() {
        if (this.scene instanceof EditorScene) {
            this.scene.removeUI(this.ui);
            this.html.remove();
            this.htmlManager.removeItem(this);
        }
    }
}

export class SlopeItem extends ObjListItem {
    declare ui: RectUI;

    constructor(ui: RectUI, name: string, htmlManager: HTMLManager) {
        super(ui, name, htmlManager);
    }

    createCont(name: string): HTMLDivElement {
        const el = super.createCont(name);

        const slopeBtn = document.createElement("button");
        slopeBtn.textContent = "rotate";
        slopeBtn.addEventListener("click", () => {
            (this.ui.obj as Slope).force.rotate(PI / 2);
        });

        el.append(slopeBtn);

        return el;
    }
}

export class PolygonItem extends ObjListItem {
    declare ui: PolygonUI;

    constructor(ui: PolygonUI, name: string, htmlManager: HTMLManager) {
        super(ui, name, htmlManager);
        (this.scene as EditorScene).currEditPolygon = ui;
    }

    createCont(name: string): HTMLDivElement {
        const el = super.createCont(name);

        const editBtn = document.createElement("button");
        editBtn.textContent = "edit";
        editBtn.addEventListener("click", () => {
            if (this.scene instanceof EditorScene) {
                this.scene.currEditPolygon = this.ui;
            }
        });

        el.append(editBtn);
        return el;
    }
}