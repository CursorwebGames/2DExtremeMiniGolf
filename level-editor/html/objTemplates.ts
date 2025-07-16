import { Bouncer } from "../../src/objects/bouncer";
import { Ice } from "../../src/objects/ice";
import { PolygonWall } from "../../src/objects/polygonWall";
import { Sand } from "../../src/objects/sand";
import { Slope } from "../../src/objects/slope";
import { Teleporter } from "../../src/objects/teleporter";
import { Wall } from "../../src/objects/wall";
import { Water } from "../../src/objects/water";
import { EditorScene } from "../scenes/editorScene";
import { PolygonComponent } from "../ui/PolygonComponent";
import { PolygonUI } from "../ui/polygonUI";
import { RectUI } from "../ui/rectUI";
import { SingleUI } from "../ui/singleUI";
import { TeleporterUI } from "../ui/teleporterUI";
import { UIComponent, UISerializable } from "../ui/UIComponent";

type CreateHTML = (ui: UIComponent, name: string, editor: EditorScene) => HTMLDivElement;

interface ObjTemplate {
    name: string,

    /**
     * Logic for UI to be added to the canvas
     */
    createUI: (x: number, y: number, e: EditorScene) => UISerializable,

    /**
     * Custom (override) logic for html to be added to the object list
     */
    createHTML?: CreateHTML,

    /**
     * For the `nameToUI` map
     */
    // todo: see if you can make this without any, just a stupid challenge
    cls: new (...args: any[]) => UISerializable,
}

export const objTemplates: ObjTemplate[] = [
    {
        name: "Square Wall",
        cls: RectUI,
        createUI: (x, y, e) => new RectUI(new Wall(x, y, 30, 30), e),
    },
    {
        name: "Ice",
        cls: RectUI,
        createUI: (x, y, e) => new RectUI(new Ice(x, y, 30, 30), e),
    },
    {
        name: "Bouncer",
        cls: SingleUI,
        createUI: (x, y, e) => new SingleUI(new Bouncer(x, y), e),
    },
    {
        name: "Slope",
        cls: RectUI,
        createUI: (x, y, e) => new RectUI(new Slope(x, y, 30, 30, [1, 0]), e),
        createHTML: createSlopeHTML as unknown as CreateHTML,
    },
    {
        name: "Polygon Wall",
        cls: PolygonUI,
        createUI: (_x, _y, e) => {
            const ui = new PolygonUI(new PolygonWall([]), e);
            e.currEditPolygon = ui;
            return ui;
        },
        createHTML: createPolygonHTML as unknown as CreateHTML,
    },
    {
        name: "Water",
        cls: PolygonUI,
        createUI: (_x, _y, e) => {
            const ui = new PolygonUI(new Water([]), e);
            e.currEditPolygon = ui;
            return ui;
        },
        createHTML: createPolygonHTML as unknown as CreateHTML,
    },
    {
        name: "Sand",
        cls: PolygonUI,
        createUI: (_x, _y, e) => {
            const ui = new PolygonUI(new Sand([]), e);
            e.currEditPolygon = ui;
            return ui;
        },
        createHTML: createPolygonHTML as unknown as CreateHTML,
    },
    {
        name: "Teleporter",
        cls: TeleporterUI,
        createUI: (x, y, e) => new TeleporterUI(new Teleporter(x, y, x, y), e),
    },
];

export const nameToUI = Object.fromEntries(objTemplates.map(({ name, cls }) => [name, cls]));

// todo: think about play scene, disabling these buttons
export function createHTML(ui: UISerializable, name: string, editor: EditorScene) {
    const el = document.createElement("div");

    const nameInput = document.createElement("input");
    nameInput.value = name;

    const delBtn = document.createElement("button");
    delBtn.innerHTML = "&times;";
    delBtn.addEventListener("click", () => {
        editor.removeUI(ui);
        el.remove();
    });

    el.append(nameInput, delBtn);
    return el;
}

export function createSlopeHTML(ui: RectUI, name: string, editor: EditorScene) {
    const el = createHTML(ui, name, editor);

    const slopeBtn = document.createElement("button");
    slopeBtn.textContent = "rotate";
    slopeBtn.addEventListener("click", () => {
        (ui.obj as Slope).force.rotate(PI / 2);
    });

    el.append(slopeBtn);

    return el;
}

export function createPolygonHTML(ui: PolygonComponent & UISerializable, name: string, editor: EditorScene) {
    const el = createHTML(ui, name, editor);

    const editBtn = document.createElement("button");
    editBtn.textContent = "edit";
    editBtn.addEventListener("click", () => {
        editor.currEditPolygon = ui;
    });

    el.append(editBtn);
    return el;
}