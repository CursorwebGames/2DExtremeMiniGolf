import { nameToObj } from "../../src/levels/levels";
import { Bouncer } from "../../src/objects/bouncer";
import { Ice } from "../../src/objects/ice";
import { Obstacle } from "../../src/objects/obstacle";
import { PolygonWall } from "../../src/objects/polygonWall";
import { Sand } from "../../src/objects/sand";
import { Slope } from "../../src/objects/slope";
import { Teleporter } from "../../src/objects/teleporter";
import { Wall } from "../../src/objects/wall";
import { Water } from "../../src/objects/water";
import { EditorScene } from "../scenes/editorScene";
import { PolygonUI } from "../ui/polygonUI";
import { RectUI } from "../ui/rectUI";
import { SingleUI } from "../ui/singleUI";
import { TeleporterUI } from "../ui/teleporterUI";
import { UISerializable } from "../ui/UIComponent";
import { ObjListItem, PolygonItem, SlopeItem } from "./objListItem";

interface PaletteSwatch {
    name: string,

    /**
     * Logic for UI to be added to the canvas
     */
    createUI: (x: number, y: number, e: EditorScene) => UISerializable,

    /**
     * For the `objToItem` map
     */
    objClass: new (...args: any[]) => Obstacle<any>,

    /**
     * Custom (override) logic for html to be added to the object list
     */
    ItemClass?: typeof ObjListItem,
}

export const paletteSwatches: PaletteSwatch[] = [
    {
        name: "Square Wall",
        objClass: Wall,
        createUI: (x, y, e) => new RectUI(new Wall(x, y, 30, 30), e),
    },
    {
        name: "Ice",
        objClass: Ice,
        createUI: (x, y, e) => new RectUI(new Ice(x, y, 30, 30), e),
    },
    {
        name: "Bouncer",
        objClass: Bouncer,
        createUI: (x, y, e) => new SingleUI(new Bouncer(x, y), e),
    },
    {
        name: "Slope",
        objClass: Slope,
        createUI: (x, y, e) => new RectUI(new Slope(x, y, 30, 30, [1, 0]), e),
        ItemClass: SlopeItem,
    },
    {
        name: "Polygon Wall",
        objClass: PolygonWall,
        createUI: (_x, _y, e) => new PolygonUI(new PolygonWall([]), e),
        ItemClass: PolygonItem,
    },
    {
        name: "Water",
        objClass: Water,
        createUI: (_x, _y, e) => new PolygonUI(new Water([]), e)
        ,
        ItemClass: PolygonItem,
    },
    {
        name: "Sand",
        objClass: Sand,
        createUI: (_x, _y, e) => new PolygonUI(new Sand([]), e),
        ItemClass: PolygonItem,
    },
    {
        name: "Teleporter",
        objClass: Teleporter,
        createUI: (x, y, e) => new TeleporterUI(new Teleporter(x, y, x, y), e),
    },
];

export const objToItem = Object.fromEntries(
    paletteSwatches.map(({ name, objClass, ItemClass }) => [
        objClass.name,
        {
            itemName: name,
            ItemClass: ItemClass || ObjListItem,
        }
    ])
) as Record<
    keyof typeof nameToObj,
    {
        itemName: string,
        ItemClass: typeof ObjListItem,
    }
>;

// todo: think about play scene, disabling these buttons
// export function createHTML(ui: UISerializable, name: string, editor: EditorScene) {
//     const el = document.createElement("div");

//     const nameInput = document.createElement("input");
//     nameInput.value = name;

//     const delBtn = document.createElement("button");
//     delBtn.innerHTML = "&times;";
//     delBtn.addEventListener("click", () => {
//         editor.removeUI(ui);
//         el.remove();
//     });

//     el.append(nameInput, delBtn);
//     return el;
// }

// export function createSlopeHTML(ui: RectUI, name: string, editor: EditorScene) {
//     const el = createHTML(ui, name, editor);

//     const slopeBtn = document.createElement("button");
//     slopeBtn.textContent = "rotate";
//     slopeBtn.addEventListener("click", () => {
//         (ui.obj as Slope).force.rotate(PI / 2);
//     });

//     el.append(slopeBtn);

//     return el;
// }

// export function createPolygonHTML(ui: PolygonComponent & UISerializable, name: string, editor: EditorScene) {
//     const el = createHTML(ui, name, editor);

//     const editBtn = document.createElement("button");
//     editBtn.textContent = "edit";
//     editBtn.addEventListener("click", () => {
//         editor.currEditPolygon = ui;
//     });

//     el.append(editBtn);
//     return el;
// }