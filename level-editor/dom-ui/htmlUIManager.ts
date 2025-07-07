// import { Bouncer } from "../../src/objects/bouncer";
// import { Ice } from "../../src/objects/ice";
// import { PolygonWall } from "../../src/objects/polygonWall";
// import { Sand } from "../../src/objects/sand";
// import { Slope } from "../../src/objects/slope";
// import { Teleporter } from "../../src/objects/teleporter";
// import { Wall } from "../../src/objects/wall";
// import { Water } from "../../src/objects/water";
// import { PolygonUI } from "../canvas-ui/polygonUI";
// import { RectUI } from "../canvas-ui/rectUI";
// import { SingleUI } from "../canvas-ui/singleUI";
// import { UIComponent } from "../canvas-ui/UIComponent";
import { EditorManager } from "../editorManager";


// const objTemplates: {
//     name: string,
//     create: (x: number, y: number) => UIComponent,
// }[] = [
//         {
//             name: "Square Wall",
//             create: (x, y) => new RectUI(new Wall(x, y, 30, 30)),
//         },
//         {
//             name: "Ice",
//             create: (x, y) => new RectUI(new Ice(x, y, 30, 30)),
//         },
//         {
//             name: "Bouncer",
//             create: (x, y) => new SingleUI(new Bouncer(x, y)),
//         },
//         {
//             name: "Slope",
//             create: (x, y) => new RectUI(new Slope(x, y, 30, 30, createVector(1, 0))),
//             render: htmlSlopeUI,
//         },
//         {
//             name: "Polygon Wall",
//             create: () => {
//                 const ui = new PolygonUI(new PolygonWall([]));
//                 main.selectedPolygon = ui;
//                 return ui;
//             },
//             render: htmlPolygonUI,
//         },
//         {
//             name: "Water",
//             create: () => {
//                 const ui = new PolygonUI(new Water([]));
//                 main.selectedPolygon = ui;
//                 return ui;
//             },
//             render: htmlPolygonUI,
//         },
//         {
//             name: "Sand",
//             create: () => {
//                 const ui = new PolygonUI(new Sand([]));
//                 main.selectedPolygon = ui;
//                 return ui;
//             },
//             render: htmlPolygonUI,
//         },
//         {
//             name: "Teleporter",
//             create: (x, y) => new TeleporterUI(new Teleporter(x, y, x, y)),
//         },
//     ];


export class HTMLUIManager {
    editor: EditorManager;

    constructor(editor: EditorManager) {
        this.editor = editor;
    }

    init() {

    }
}